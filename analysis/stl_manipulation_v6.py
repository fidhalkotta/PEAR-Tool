import numpy as np
# noinspection PyUnresolvedReferences
import scienceplots
from matplotlib import pyplot as plt
from sklearn.cluster import KMeans
from stl import mesh
from tqdm import tqdm

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
your_stl_file = 'CT_2_1_As.stl'
aorta_mesh = mesh.Mesh.from_file('data/' + your_stl_file)

# Manually specified bifurcation point (in mm from top)
bifurcation_z = 46
# Replace the call to your previous function with this one
main_centerline, branch_centerlines = compute_branch_centerlines(aorta_mesh, bifurcation_z, 4)

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Unzip the centerline points
xs, ys, zs = zip(*main_centerline)

# index_of_points_to_highlight = [1, 3, 7, 12, 18, 25, 29, 36, 40]
# for i in index_of_points_to_highlight:
#     ax.scatter(xs[i], ys[i], zs[i], c='b', marker='o')

ax.plot(xs, ys, zs, 'r-', linewidth=2)

xs, ys, zs = zip(*branch_centerlines[0])
ax.plot(xs, ys, zs, 'b-', linewidth=2)

xs, ys, zs = zip(*branch_centerlines[1])
ax.plot(xs, ys, zs, 'g-', linewidth=2)

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

from scipy.interpolate import interp1d


def create_interpolated_centerlines(main_centerline, branch_centerlines, bifurcation_z):
    # Create interpolation functions for the main centerline
    main_xs, main_ys, main_zs = zip(*main_centerline)
    main_f_x = interp1d(main_zs, main_xs, kind='linear', fill_value="extrapolate")
    main_f_y = interp1d(main_zs, main_ys, kind='linear', fill_value="extrapolate")

    # Create interpolation functions for each branch centerline
    branch_f_xs = []
    branch_f_ys = []
    for branch in branch_centerlines:
        xs, ys, zs = zip(*branch)
        f_x = interp1d(zs, xs, kind='linear', fill_value="extrapolate")
        f_y = interp1d(zs, ys, kind='linear', fill_value="extrapolate")
        branch_f_xs.append(f_x)
        branch_f_ys.append(f_y)

    # Function to find interpolated points across the bifurcation
    def find_interpolated_point(z_value):
        if z_value <= bifurcation_z:
            # Use main centerline interpolation
            x = main_f_x(z_value)
            y = main_f_y(z_value)
        else:
            # Determine which branch to use based on proximity to starting points
            distances = [abs(z_value - branch[0][2]) for branch in branch_centerlines]
            branch_index = distances.index(min(distances))
            x = branch_f_xs[branch_index](z_value)
            y = branch_f_ys[branch_index](z_value)
        return np.array([x, y])

    return find_interpolated_point


def scale_mesh_with_interpolation(mesh, find_interpolated_point, scale_factor):
    # Iterate over each vertex in the mesh, use tqdm for progress bar
    for i in tqdm(range(len(mesh.vectors))):
        for j in range(3):  # Each triangle has 3 vertices
            point = mesh.vectors[i][j]
            # Use the Z value of the mesh point to find the interpolated centerline point
            interpolated_point = find_interpolated_point(point[2])

            # Compute the direction vector from the interpolated centerline point to the mesh point
            # Only for X and Y components, Z component remains unchanged
            direction = np.array([point[0] - interpolated_point[0], point[1] - interpolated_point[1], 0])

            # Scale the point away from the centerline point
            scaled_point = np.array([interpolated_point[0] + direction[0] * scale_factor,
                                     interpolated_point[1] + direction[1] * scale_factor,
                                     point[2]])  # Keep Z component unchanged

            # Update the mesh vertex
            mesh.vectors[i][j] = scaled_point

    return mesh


# Create the interpolated centerline function
find_interpolated_point = create_interpolated_centerlines(main_centerline, branch_centerlines, bifurcation_z)

# Scale the mesh using the interpolated centerline
scaled_mesh = scale_mesh_with_interpolation(aorta_mesh, find_interpolated_point, scale_factor=1.5)

# Optionally, save the scaled mesh to a new STL file
scaled_mesh.save('data/scaled_' + your_stl_file)
