

import numpy as np
from scipy.interpolate import interp1d
from stl import mesh


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


def save_new_mesh(scaled_mesh_vectors, original_mesh_file, scale_factor):
    # Create a new mesh object for the scaled mesh
    scaled_mesh = mesh.Mesh(np.zeros(scaled_mesh_vectors.shape[0], dtype=mesh.Mesh.dtype))
    for i, f in enumerate(scaled_mesh_vectors):
        scaled_mesh.vectors[i] = f

    save_name = 'outputs/V7/' + original_mesh_file[:-4] + f'_scaled_{scale_factor}.stl'

    scaled_mesh.save(save_name)

    print("Scaled mesh saved to", save_name)