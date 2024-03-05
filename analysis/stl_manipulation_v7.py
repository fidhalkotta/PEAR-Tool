import numpy as np
# noinspection PyUnresolvedReferences
import scienceplots
from matplotlib import pyplot as plt
from sklearn.cluster import KMeans
from stl import mesh

from stl_scale_functions import create_interpolated_centerline, scale_stl_mesh_interpolated, save_new_mesh_v2

plt.style.use(['grid', 'science'])


# Function to calculate centroids
def find_centroid(points):
    length = points.shape[0]
    sum_x = np.sum(points[:, 0])
    sum_y = np.sum(points[:, 1])
    return sum_x / length, sum_y / length


def find_clusters_kmeans(points_2d, n_clusters=2):
    # Apply K-means clustering to partition the points into two clusters
    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(points_2d)
    return kmeans.labels_


# Function to compute centerline below bifurcation point
def compute_branch_centerlines(mesh, bifurcation_z, z_interval):
    min_z = np.min(mesh.vectors[:, :, 2])
    max_z = np.max(mesh.vectors[:, :, 2])

    main_centerline_points = []
    branch_centerline_points = [[], []]  # List of lists for each branch

    # Iterate through layers above bifurcation to compute main centerline
    for z in np.arange(bifurcation_z, max_z, z_interval):
        layer_mask = (mesh.vectors[:, :, 2] >= z) & (mesh.vectors[:, :, 2] < z + z_interval)
        layer_points = mesh.vectors[layer_mask][:, :2]
        if len(layer_points) > 0:
            centroid = find_centroid(layer_points)
            main_centerline_points.append((centroid[0], centroid[1], z + z_interval / 2))

    for z in np.arange(min_z, bifurcation_z, z_interval):
        layer_mask = (mesh.vectors[:, :, 2] >= z) & (mesh.vectors[:, :, 2] < z + z_interval)
        layer_points = mesh.vectors[layer_mask][:, :2]
        if len(layer_points) > 3:  # Need at least 4 points to form two separate clusters
            # Cluster the points into two clusters using K-means
            labels = find_clusters_kmeans(layer_points)

            # plt.figure(figsize=(8, 6))
            # for cluster_index in range(2):  # We expect two clusters
            #     cluster_mask = labels == cluster_index
            #     cluster_points = layer_points[cluster_mask]
            #     plt.scatter(cluster_points[:, 0], cluster_points[:, 1], label=f'Cluster {cluster_index + 1}')
            # plt.xlabel('X')
            # plt.ylabel('Y')
            # plt.title(f'K-means Clustering of the First Interval Below Bifurcation for Z = {z:.2f} mm to {z + z_interval:.2f} mm')
            # plt.legend()
            #
            # # save plot to
            # plt.savefig(f'outputs/V8/clusters/cluster_plot_z-{z:.2f}_to_{z + z_interval:.2f}.png', dpi=300, bbox_inches='tight')

            centroids = []

            # Compute the centroid for each cluster
            for cluster_index in range(2):  # We expect two clusters
                cluster_mask = labels == cluster_index
                cluster_points = layer_points[cluster_mask]
                if len(cluster_points) > 0:
                    centroid = find_centroid(cluster_points)
                    centroids.append((centroid, cluster_index))

            centroids.sort(key=lambda c: c[0][0])

            # Assign points to clusters based on sorted centroids
            for centroid, original_index in centroids:
                branch_centerline_points[centroids.index((centroid, original_index))].append(
                    (centroid[0], centroid[1], z + z_interval / 2))

    return main_centerline_points, branch_centerline_points


# Load the STL file
your_stl_file = 'CT_2_1_A.stl'
aorta_mesh = mesh.Mesh.from_file('data/' + your_stl_file)

# Manually specified bifurcation point (in mm from top)
bifurcation_z = 51
# Replace the call to your previous function with this one
main_centerline, branch_centerlines = compute_branch_centerlines(aorta_mesh, bifurcation_z, 6)

singlular_centerline = branch_centerlines[0][:-2]
singlular_centerline.extend(main_centerline)







fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Unzip the centerline points
xs, ys, zs = zip(*singlular_centerline)

ax.plot(xs, ys, zs, 'r-', linewidth=2)
# make all 3 axes equal
max_range = np.array([xs, ys, zs]).max()
ax.set_xlim([0, max_range])
ax.set_ylim([0, max_range])
ax.set_zlim([0, max_range])

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
plt.title('Approximated Centerline of the Aorta')
plt.show()



# Create the interpolated centerline functions
f_x, f_y = create_interpolated_centerline(singlular_centerline)

scale_factor = 1.45

scaled_mesh_vectors_interpolated = scale_stl_mesh_interpolated(aorta_mesh, f_x, f_y, scale_factor)

save_name = 'outputs/V10/' + your_stl_file[:-4] + f'_scaled_m1-5_{scale_factor}_v6.stl'

save_new_mesh_v2(scaled_mesh_vectors_interpolated, your_stl_file, scale_factor, save_name)


print("done")

