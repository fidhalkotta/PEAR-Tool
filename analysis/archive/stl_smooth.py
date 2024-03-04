import open3d as o3d


def repair_mesh_not_sure_this_does_much(mesh):
    # Remove duplicate vertices, degenerate triangles, and non-manifold edges
    mesh.remove_duplicated_vertices()
    mesh.remove_degenerate_triangles()
    mesh.remove_non_manifold_edges()

    # Attempt to fill holes in the mesh
    # mesh = o3d.t.geometry.TriangleMesh.from_legacy(mesh).fill_holes(10000000).to_legacy()

    return mesh

def smooth_mesh_with_open3d(stl_file_path):
    # Load the STL file

    mesh_list = []
    mesh = o3d.io.read_triangle_mesh(stl_file_path)

    # Repair the mesh if it's not watertight
    if not mesh.is_watertight():
        print("Mesh is not watertight, you have big hole.")
        mesh = repair_mesh_not_sure_this_does_much(mesh)

        # # Check if the mesh is watertight after repair
        # if not repaired_mesh.is_watertight():
        #     print("Failed to repair the mesh.")
        #     # return


    # Apply Laplacian smoothing
    smoothed_mesh = mesh.filter_smooth_laplacian(number_of_iterations=30, lambda_filter=0.8)

    smoothed_mesh.translate((0, 25, 0))

    # Pick a random color for visualization
    mesh.paint_uniform_color([0,1,0])
    smoothed_mesh.paint_uniform_color([1,0,0])

    mesh_list.append(mesh)
    mesh_list.append(smoothed_mesh)
    # o3d.visualization.draw([mesh], title='Original Mesh')
    o3d.visualization.draw_geometries(mesh_list, window_name='Smoothed', mesh_show_wireframe=True)

    #
    # # Save the smoothed mesh
    # output_file_path = stl_file_path.replace('.stl', '_smoothed.stl')
    # o3d.io.write_triangle_mesh(output_file_path, smoothed_mesh)
    # print(f"Smoothed mesh saved to: {output_file_path}")

# Specify the path to your STL file
stl_file_path = 'data/CT_2_1_A.stl'

# Smooth the mesh and save it
smooth_mesh_with_open3d(stl_file_path)
