import numpy as np
import scipy.io  # Alternative to hdf5storage
import pandas as pd

# Load Human3.6M dataset
h36m_data = scipy.io.loadmat("Human3.6M/dataset/h36m_keypoints.mat")

# Print available keys (to confirm structure)
print(h36m_data.keys())

# Extract keypoints (Check the correct key in your dataset)
pose_data = h36m_data['pose3d']  # Update if needed

# Define squat detection function
def is_squat(frame, hip_joint=0, knee_joint=6):
    hip = frame[hip_joint]
    knee = frame[knee_joint]
    return knee[1] < hip[1]

# Extract squat keypoints
squat_data = [frame.flatten() for frame in pose_data if is_squat(frame)]

# Save to CSV
df = pd.DataFrame(squat_data)
df.to_csv("squat_keypoints.csv", index=False)
print("✅ Squat keypoints saved to squat_keypoints.csv")
