import math

import matplotlib.pyplot as plt
import numpy as np

a1, b1, a2, b2 = 2.2, 0.0, 0.0, -2.4



def calculate_inner_diameter(x):
    DS_I = x

    dS_I = 0.4
    p_s_RM = 5

    phi = np.linspace(0, 2 * np.pi, 360)

    xs = ((DS_I - dS_I) / 2) * np.cos(phi),

    ys = ((DS_I - dS_I) / 2) * np.sin(phi),


    # Calculate Fourier series
    X_RM = [
        ((DS_I - dS_I) / 2) * np.cos(phi),
        ((DS_I - dS_I) / 2) * np.sin(phi),
        a1 * np.cos(p_s_RM * phi) + b1 * np.sin(p_s_RM * phi) + a2 * np.cos(2 * p_s_RM * phi) + b2 * np.sin(
            2 * p_s_RM * phi)
    ]

    # fidhal_diameter = (np.max(X_RM[0])) - (np.min(X_RM[0])) - w_t
    marton_diameter = (math.sqrt((X_RM[0][0] ** 2) + (X_RM[0][1] ** 2))) * 2

    if x == 10:
        # Create a 3D plot
        fig = plt.figure(figsize=(12, 9))
        ax = fig.add_subplot(111, projection='3d')

        # Plot the 3D shape
        ax.plot(X_RM[0], X_RM[1], X_RM[2])

        ax.set_title('3D Plot of Stent Limb Shape Described by Fourier Series')
        ax.set_xlabel('X Component')
        ax.set_ylabel('Y Component')
        ax.set_zlabel('Z Component')

        plt.show()

    return marton_diameter


target = 25

print(target)
print(calculate_inner_diameter(target))


#
#
# # range of 100 values betwene 1 and 40
# pre_DS_I_range = np.linspace(10, 40, 1000)
#
# final_df = pd.DataFrame(columns=['ds', 'marton_diameter_middle'])
#
# for i,v in enumerate(pre_DS_I_range):
#     # add to final_df the value of the function
#     final_df.loc[i] = [v, calculate_inner_diameter(v)]
#
#
#
# # Save as a CSV
# final_df.to_csv('./outputs/V13/experiment_4.csv', index=False)





