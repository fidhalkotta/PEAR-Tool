from stl import mesh

from stl_centreline_functions import process_layers, show_centerline
from stl_scale_functions import create_interpolated_centerline, scale_stl_mesh_interpolated, save_new_mesh

# Load the STL file
your_stl_file = 'ioanna_28_v5.stl'
aorta_mesh = mesh.Mesh.from_file('data/' + your_stl_file)

# used 7 for pre ioanna smoothed one
# using 4 now for post smoothed one
centerline = process_layers(aorta_mesh, your_stl_file, 4 )

show_centerline(centerline)

# Create the interpolated centerline functions
f_x, f_y = create_interpolated_centerline(centerline)

# 1.25, 1.40, 1.60,
# 1.45, 1.60, 1.8

scale_factor = 1.8

scaled_mesh_vectors_interpolated = scale_stl_mesh_interpolated(aorta_mesh, f_x, f_y, scale_factor)

save_new_mesh(scaled_mesh_vectors_interpolated, your_stl_file, scale_factor)


print("done")


