import csv

import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import interp1d
from stl import mesh

# Load the STL file
your_stl_file = 'CT_2_1_A.stl'
aorta_mesh = mesh.Mesh.from_file(your_stl_file)

# Function to find the centroid of a set of points in a slice
def find_centroid(points):
    length = points.shape[0]
    sum_x = np.sum(points[:, 0])
    sum_y = np.sum(points[:, 1])
    return sum_x / length, sum_y / length


# Function to process each layer
def process_layers(aorta_mesh, z_interval=1.0):
    # Determine the range of Z values
    min_z, max_z = np.min(aorta_mesh.vectors[:, :, 2]), np.max(aorta_mesh.vectors[:, :, 2])

    centerline_points = []

    # Iterate through layers
    for z in np.arange(min_z, max_z, z_interval):
        # Extract points close to the current Z layer
        layer_mask = (aorta_mesh.vectors[:, :, 2] >= z) & (aorta_mesh.vectors[:, :, 2] < z + z_interval)
        layer_points = aorta_mesh.vectors[layer_mask][:, :2]  # Extracting only X and Y

        if len(layer_points) > 0:
            centroid = find_centroid(layer_points)
            centerline_points.append((centroid[0], centroid[1], z + z_interval / 2))

    return centerline_points


centerline = process_layers(aorta_mesh, 7)

with open('centerline.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["x", "y", "z"])
    writer.writerows(centerline)

# The 'centerline' variable now contains approximate center points for each layer.

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Unzip the centerline points
xs, ys, zs = zip(*centerline)

ax.plot(xs, ys, zs, 'r-', linewidth=2)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
plt.title('Approximated Centerline of the Aorta')
plt.show()

# Load the original STL file
aorta_mesh = mesh.Mesh.from_file(your_stl_file)

# Function to create an interpolated centerline function
def create_interpolated_centerline(centerline):
    # Unzip the centerline points
    xs, ys, zs = zip(*centerline)

    # Create interpolation functions for x and y coordinates along z
    f_x = interp1d(zs, xs, kind='linear', fill_value="extrapolate")
    f_y = interp1d(zs, ys, kind='linear', fill_value="extrapolate")

    return f_x, f_y

# Function to find the interpolated centerline point for a given Z value
def find_interpolated_centerline_point(f_x, f_y, z_value):
    x = f_x(z_value)
    y = f_y(z_value)
    return np.array([x, y])

# Create the interpolated centerline functions
f_x, f_y = create_interpolated_centerline(centerline)


# Function to scale a point relative to a reference point
def scale_point(point, reference, scale_factor=1.1):
    # Calculate the direction vector from the reference point to the original point
    direction = point - reference
    # Scale the direction vector
    scaled_direction = direction * scale_factor
    # Calculate the new point position
    new_point = reference + scaled_direction
    return new_point


# Scale the STL mesh using interpolated centerline
def scale_stl_mesh_interpolated(aorta_mesh, f_x, f_y, scale_factor=1.1):
    scaled_vectors = np.zeros_like(aorta_mesh.vectors)

    for i, triangle in enumerate(aorta_mesh.vectors):
        for j, point in enumerate(triangle):
            z_value = point[2]
            centerline_point_xy = find_interpolated_centerline_point(f_x, f_y, z_value)
            # Scale only the X and Y coordinates
            scaled_point_xy = scale_point(point[:2], centerline_point_xy, scale_factor)
            scaled_vectors[i, j, :2] = scaled_point_xy
            scaled_vectors[i, j, 2] = z_value  # Keep the Z coordinate unchanged

    return scaled_vectors

# Compute the scaled STL mesh using interpolation
scaled_mesh_vectors_interpolated = scale_stl_mesh_interpolated(aorta_mesh, f_x, f_y, centerline)


# Create a new mesh object for the scaled mesh
scaled_mesh = mesh.Mesh(np.zeros(scaled_mesh_vectors_interpolated.shape[0], dtype=mesh.Mesh.dtype))
for i, f in enumerate(scaled_mesh_vectors_interpolated):
    scaled_mesh.vectors[i] = f

scaled_mesh.save(your_stl_file[:-4] + '_scaled.stl')
