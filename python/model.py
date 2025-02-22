import torch
import torch.nn as nn
import torch.optim as optim
import random
import numpy as np

# Define Deep Q-Network (DQN) Model
class DQNPoseCorrection(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(DQNPoseCorrection, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, output_dim)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

# Simulated Training Data (Replace with real pose data)
pose_keypoints = [
    (np.random.rand(34), 0),  # Example: Bad posture -> "Straighten Back"
    (np.random.rand(34), 1),  # Example: Bad posture -> "Lower Squat"
    (np.random.rand(34), 2),  # Example: Bad posture -> "Align Arms"
    (np.random.rand(34), 3),  # Example: Bad posture -> "Correct Knee Angle"
]

# Convert to tensors
X_train = torch.tensor([x[0] for x in pose_keypoints], dtype=torch.float32)
y_train = torch.tensor([x[1] for x in pose_keypoints], dtype=torch.long)

# Define model, loss, and optimizer
model = DQNPoseCorrection(input_dim=34, output_dim=4)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
epochs = 100
for epoch in range(epochs):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
    if epoch % 10 == 0:
        print(f"Epoch [{epoch}/{epochs}], Loss: {loss.item()}")

# Save the trained model
torch.save(model.state_dict(), "pose_correction_dqn.pth")
print("Model saved as pose_correction_dqn.pth")
