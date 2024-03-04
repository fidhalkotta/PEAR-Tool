import os

from stl import mesh


# Function to scale the mesh by a given factor relative to the origin and save it
def scale_and_save_mesh(original_stl_file, scale_factor=0.1):
    # Load the original STL file
    original_mesh = mesh.Mesh.from_file(original_stl_file)

    # Scale the mesh by the scale factor
    original_mesh.vectors *= scale_factor

    # Construct the new file name
    file_path, file_extension = os.path.splitext(original_stl_file)
    new_file_name = f"{file_path}_scaled_down_fake{file_extension}"

    # Save the scaled mesh to the new STL file
    original_mesh.save(new_file_name)
    print(f"Saved the scaled mesh to '{new_file_name}'")

# Specify your STL file
your_stl_file = 'CT_2_1_A.stl'

# Scale down the mesh by a factor of 0.1 and save it
scale_and_save_mesh(your_stl_file)