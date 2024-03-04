import random

import open3d as o3d


def visualize_mesh(stl_file_path):
    # Load the STL file into a mesh object
    mesh = o3d.io.read_triangle_mesh(stl_file_path)

    # Check if the mesh contains normals, if not, compute them
    if not mesh.has_vertex_normals():
        mesh.compute_vertex_normals()

    # mesh.paint_uniform_color([1, 0, 0])

    # pick a random number between 0 and 1 for each of the RGB values
    mesh.paint_uniform_color([random.random(), random.random(), random.random()])

    # Visualize the mesh
    o3d.visualization.draw_geometries([mesh], mesh_show_wireframe=True)

# Specify the path to your STL file
# stl_file_path = 'data/CT_2_1_A.stl'

stl_file_path = 'outputs/V4/CT_2_1_A_scaled_down_fake.stl'

# Visualize the mesh
visualize_mesh(stl_file_path)
