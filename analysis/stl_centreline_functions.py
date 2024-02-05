import csv

import matplotlib.pyplot as plt
import numpy as np


def find_centroid(points):
    length = points.shape[0]
    sum_x = np.sum(points[:, 0])
    sum_y = np.sum(points[:, 1])
    return sum_x / length, sum_y / length


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

    with open('centerline.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["x", "y", "z"])
        writer.writerows(centerline_points)

    return centerline_points


def show_centerline(centerline):
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