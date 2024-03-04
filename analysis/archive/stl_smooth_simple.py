import numpy as np
import open3d as o3d


def repair_mesh(mesh):
    # Repairing steps (remove duplicated vertices, degenerate triangles, non-manifold edges)
    mesh.remove_duplicated_vertices()
    mesh.remove_degenerate_triangles()
    mesh.remove_non_manifold_edges()
    return mesh


def smooth_and_visualize(mesh, iterations):
    # Create a window to visualize the results
    # vis = o3d.visualization.Visualizer()
    # vis.create_window()

    mesh_list = [mesh]

    # Translate each mesh to avoid overlap in visualization
    translation_distance = 25  # Adjust the distance based on your mesh size
    translation_axis = np.array([1, 1, 0])  # Translate along x-axis

    mesh.paint_uniform_color([1,0,0])

    mesh_list = [mesh]

    for i, iteration in enumerate(iterations):
        # Apply Laplacian smoothing with the current set of parameters
        smoothed_mesh = mesh.filter_smooth_simple(number_of_iterations=iteration)

        smoothed_mesh = repair_mesh(smoothed_mesh)

        # Translate the mesh to its visualization position
        translation = translation_axis * translation_distance * (i +1)
        smoothed_mesh.translate(translation)

        # Set a unique color for each mesh
        color = np.random.rand(3)
        smoothed_mesh.paint_uniform_color(color)

        # Add the mesh to the visualizer
        # vis.add_geometry(smoothed_mesh)
        mesh_list.append(smoothed_mesh)

    # Run the visualizer
    # vis.run()
    # vis.destroy_window()

    print(f"Length of Mesh list: {len(mesh_list)}")


    o3d.visualization.draw_geometries(mesh_list, window_name='Laplacian Testing', mesh_show_wireframe=True)

# Load the mesh
stl_file_path = 'data/CT_2_1_A.stl'
mesh = o3d.io.read_triangle_mesh(stl_file_path)
# mesh.compute_vertex_normals()

# Repair the mesh if needed
if not mesh.is_watertight():
    print("Mesh is not watertight, attempting to repair.")
    mesh = repair_mesh(mesh)

# Define the range of parameters you want to test
iterations = [1, 2, 4, 8, 16, 32, 64 , 128]  # Example: 5, 10, 15 iterations
# lambdas = [0.5]

# Apply smoothing with different parameters and visualize
smooth_and_visualize(mesh, iterations)
