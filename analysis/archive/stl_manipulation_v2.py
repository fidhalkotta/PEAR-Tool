# The 'centerline' variable now contains approximate center points for each layer.
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
    min_z, max_z = np.min(aorta_mesh.vectors[:,:,2]), np.max(aorta_mesh.vectors[:,:,2])

    centerline_points = []

    # Iterate through layers
    for z in np.arange(min_z, max_z, z_interval):
        # Extract points close to the current Z layer
        layer_mask = (aorta_mesh.vectors[:,:,2] >= z) & (aorta_mesh.vectors[:,:,2] < z + z_interval)
        layer_points = aorta_mesh.vectors[layer_mask][:,:2]  # Extracting only X and Y

        if len(layer_points) > 0:
            centroid = find_centroid(layer_points)
            centerline_points.append((centroid[0], centroid[1], z + z_interval / 2))

    return centerline_points

centerline = process_layers(aorta_mesh, 6)

# Load the STL file

from stl import mesh
from mpl_toolkits import mplot3d
from matplotlib import pyplot

# Create a new plot
figure = pyplot.figure()
axes = mplot3d.Axes3D(figure)

# Load the STL files and add the vectors to the plot
your_stl_file = 'CT_2_1_A.stl'
your_mesh = mesh.Mesh.from_file(your_stl_file)

my_vectors = your_mesh.vectors[0:100]
axes.add_collection3d(mplot3d.art3d.Poly3DCollection(my_vectors))
#
# # Auto scale to the mesh size
# scale = your_mesh.points.flatten()
# axes.auto_scale_xyz(scale, scale, scale)

# Show the plot to the screen
pyplot.show()




# from stl import mesh
#
# mesh = mesh.Mesh.from_file('CT_2_1_A.stl')
#
# # add the list of mesh.v0, mesh.v1, mesh.v2 to a list, and only keep the unique values
#
# list_of_vertices = []
#
# for i in range(len(mesh.v0)):
#     list_of_vertices.append(mesh.v0[i].tolist())
#     list_of_vertices.append(mesh.v1[i].tolist())
#     list_of_vertices.append(mesh.v2[i].tolist())
#
#
# list_of_vertices = list(set(tuple(x) for x in list_of_vertices))



