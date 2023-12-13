import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Fourier Coefficients for the stent limb shape
a1, b1, a2, b2 = 2.2, 0.0, 0.0, -2.4
# Stent limb diameter and graft thickness (thickness gets wierd importing to fusion so i divided by 10
DS_I, dS_I = 37.25, 0.08

# wore thickness (diameter of wire)
w_t = 0.4

# Number of peaks per stent limb
p_s_RM = 5

phi = np.linspace(0, 2 * np.pi, 300)

# Calculate Fourier series
X_RM = [
    (DS_I - dS_I)/2 * np.cos(phi),
    (DS_I - dS_I)/2 * np.sin(phi),
    a1 * np.cos(p_s_RM * phi) + b1 * np.sin(p_s_RM * phi) + a2 * np.cos(2 * p_s_RM * phi) + b2 * np.sin(2 * p_s_RM * phi)
]

# Create a 3D plot
fig = plt.figure(figsize=(12, 9))
ax = fig.add_subplot(111, projection='3d')

# Plot the 3D shape
ax.plot(X_RM[0], X_RM[1], X_RM[2])

ax.set_title('3D Plot of Stent Limb Shape Described by Fourier Series')
ax.set_xlabel('X Component')
ax.set_ylabel('Y Component')
ax.set_zlabel('Z Component')


# make a data frame with each component of X_RM
df = pd.DataFrame({'x': X_RM[0]/10, 'y': X_RM[1]/10, 'z': X_RM[2]/10})

# Save as a CSV
# df.to_csv('./outputs/V2/fourier_transform.csv', index=False)

# whats the range of X valurs
print('X range Centre Lines: ', np.max(X_RM[0]) - np.min(X_RM[0]))

# add wire thickness to the range
print('X range with wire thickness(outer): ', np.max(X_RM[0]) - np.min(X_RM[0]) + w_t)
# add wire thickness to the range
print('X range without wire thickness(inner): ', np.max(X_RM[0]) - np.min(X_RM[0]) - w_t)


plt.show()


