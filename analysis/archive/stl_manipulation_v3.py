import numpy as np
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

# save the points of the centerline to a file as csv
import csv

with open('centerline.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["x", "y", "z"])
    writer.writerows(centerline)

# The 'centerline' variable now contains approximate center points for each layer.


import matplotlib.pyplot as plt

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


# Function to find the closest centerline point for a given Z value
def find_closest_centerline_point(centerline, z_value):
    closest_point = min(centerline, key=lambda point: abs(point[2] - z_value))
    return np.array(closest_point[:2])  # Return only the X and Y coordinates


# Function to scale a point relative to a reference point
def scale_point(point, reference, scale_factor=1.1):
    # Calculate the direction vector from the reference point to the original point
    direction = point - reference
    # Scale the direction vector
    scaled_direction = direction * scale_factor
    # Calculate the new point position
    new_point = reference + scaled_direction
    return new_point


# Scale the STL mesh
def scale_stl_mesh(aorta_mesh, centerline, scale_factor=1.1):
    scaled_vectors = np.zeros_like(aorta_mesh.vectors)

    for i, triangle in enumerate(aorta_mesh.vectors):
        for j, point in enumerate(triangle):
            z_value = point[2]
            centerline_point = find_closest_centerline_point(centerline, z_value)
            # Scale only the X and Y coordinates
            scaled_point_xy = scale_point(point[:2], centerline_point, scale_factor)
            scaled_vectors[i, j, :2] = scaled_point_xy
            scaled_vectors[i, j, 2] = z_value  # Keep the Z coordinate unchanged

    return scaled_vectors


# Compute the scaled STL mesh
scaled_mesh_vectors = scale_stl_mesh(aorta_mesh, centerline)

# Create a new mesh object for the scaled mesh
scaled_mesh = mesh.Mesh(np.zeros(scaled_mesh_vectors.shape[0], dtype=mesh.Mesh.dtype))
for i, f in enumerate(scaled_mesh_vectors):
    scaled_mesh.vectors[i] = f

scaled_mesh.save(your_stl_file[:-4] + '_scaled.stl')
