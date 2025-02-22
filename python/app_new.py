import requests
import numpy as np
import tensorflow as tf
import time

# Load Trained LSTM Model
model = tf.keras.models.load_model("squat_correction_model.h5")

# Define Server URL (Change if needed)
SERVER_URL = "http://172.16.3.23:5000"

# Number of frames for LSTM input
TIME_STEPS = 30
NUM_KEYPOINTS = 17
FEATURES = 4  # x, y, z, visibility

# Buffer to store last 30 frames
pose_buffer = []

while True:
    try:
        # Fetch JSON pose data from the server
        response = requests.get(SERVER_URL)
        if response.status_code != 200:
            print("❌ Failed to fetch data from server")
            continue
        
        # Parse JSON response
        pose_data = response.json()

        # Extract keypoints (Ensure they match expected format)
        keypoints = []
        for joint in pose_data["keypoints"]:
            keypoints.extend([joint["x"], joint["y"], joint["z"], joint["visibility"]])

        # Add new frame to buffer
        pose_buffer.append(keypoints)

        # Keep only the last 30 frames
        if len(pose_buffer) > TIME_STEPS:
            pose_buffer.pop(0)

        # Run inference only if buffer is full
        if len(pose_buffer) == TIME_STEPS:
            input_data = np.array(pose_buffer).reshape(1, TIME_STEPS, NUM_KEYPOINTS * FEATURES)
            prediction = model.predict(input_data)

            # Interpret results
            squat_quality = "Good Squat ✅" if np.argmax(prediction) == 0 else "Bad Squat ❌"
            print(f"📢 {squat_quality}")

        # Wait before fetching again
        time.sleep(0.1)  # Adjust if needed for real-time performance

    except Exception as e:
        print(f"⚠️ Error: {e}")
        time.sleep(1)  # Prevent excessive retries
