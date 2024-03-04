import numpy as np
import pandas as pd

# Load your CSV file with pandas
centerline_data = pd.read_csv('centerline_v2.csv')

# Adjust the data for Abaqus's coordinate system where Y is up.
# centerline_data.columns = ['x', 'z', 'y']

# Define the indices where you want to place the parts (Python uses 0-based indexing)
b = [1, 3, 7, 12, 18, 25, 29, 36, 40]  # Subtract 1 from your 1-based indices

# make b every other number from 0 to length of centerline_data
# b = list(range(0, len(centerline_data), 2))


print(b)


# Function to calculate the tangent vector at a point
def calculate_tangent(df, index):
    if index == 0:
        p1 = df.iloc[index]
        p2 = df.iloc[index + 1]
    elif index == len(df) - 1:
        p1 = df.iloc[index - 1]
        p2 = df.iloc[index]
    else:
        p1 = df.iloc[index - 1]
        p2 = df.iloc[index + 1]
    tangent = (p2 - p1).values
    tangent /= np.linalg.norm(tangent)
    return tangent

# Function to calculate the axis and angle of rotation to align with the tangent vector
def calculate_rotation_axis_angle(initial_dir, tangent_vector):
    initial_dir = initial_dir / np.linalg.norm(initial_dir)
    tangent_vector = tangent_vector / np.linalg.norm(tangent_vector)
    rotation_axis = np.cross(initial_dir, tangent_vector)
    dot_product = np.clip(np.dot(initial_dir, tangent_vector), -1.0, 1.0)
    rotation_angle = np.arccos(dot_product)
    rotation_angle_degrees = np.degrees(rotation_angle)
    if np.allclose(rotation_axis, [0.0, 0.0, 0.0]):
        if np.isclose(dot_product, -1.0):
            rotation_axis = np.array([1.0, 0.0, 0.0])
            rotation_angle_degrees = 180.0
    return rotation_axis, rotation_angle_degrees


# Function to calculate the transformations for each specified index
def calculate_transformations(df, indices):
    transformations = []
    for index in indices:
        translation = df.iloc[index].values
        tangent = calculate_tangent(df, index)
        rotation_axis, rotation_angle_degrees = calculate_rotation_axis_angle(np.array([0, 0, 1]), tangent)
        transformations.append({
            'crown_node_location': index,  #  0-based indexing
            'translation_x': translation[0],
            'translation_y': translation[1],
            'translation_z': translation[2],
            'rotation_axis_x': rotation_axis[0],
            'rotation_axis_y': rotation_axis[1],
            'rotation_axis_z': rotation_axis[2],
            'rotation_angle_degrees': rotation_angle_degrees
        })
    return pd.DataFrame(transformations)

# Calculate transformations
transformations_df = calculate_transformations(centerline_data, b)

# Save the transformations to a CSV file
transformations_df.to_csv('transformations_v3_v2.csv', index=False)

# Print out the DataFrame to see the data
print(transformations_df)
