from stl import mesh

from stl_centreline_functions import process_layers, show_centerline
from stl_scale_functions import create_interpolated_centerline, scale_stl_mesh_interpolated, save_new_mesh

# Load the STL file
your_stl_file = 'CT_2_1_A_correct_sized.stl'
aorta_mesh = mesh.Mesh.from_file(your_stl_file)



centerline = process_layers(aorta_mesh, 0.7)

show_centerline(centerline)

# Create the interpolated centerline functions
f_x, f_y = create_interpolated_centerline(centerline)

scaled_mesh_vectors_interpolated = scale_stl_mesh_interpolated(aorta_mesh, f_x, f_y, 1.1)

save_new_mesh(scaled_mesh_vectors_interpolated, your_stl_file)


print("done")


#
#
# scaled_mesh_vectors = scale_stl_mesh(aorta_mesh, centerline, 1.1)
#
# # Create a new mesh object for the scaled mesh
# scaled_mesh = mesh.Mesh(np.zeros(scaled_mesh_vectors.shape[0], dtype=mesh.Mesh.dtype))
# for i, f in enumerate(scaled_mesh_vectors):
#     scaled_mesh.vectors[i] = f
#
# scaled_mesh.save(your_stl_file[:-4] + '_scaled.stl')
