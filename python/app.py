from flask import Flask, Response, jsonify, request
import cv2
import mediapipe as mp
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

# Store keypoints globally
latest_keypoints = []
feedback_text = ""
selected_exercise = None  # Stores the current exercise

def calculate_angle(a, b, c):
    a = np.array([a['x'], a['y']])
    b = np.array([b['x'], b['y']])
    c = np.array([c['x'], c['y']])
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.arccos(np.clip(cosine_angle, -1.0, 1.0))
    return np.degrees(angle)

def squat_feedback(keypoints):
    global feedback_text
    if len(keypoints) < 33:
        feedback_text = "Make sure your whole body is visible!"
        return
    
    hip = keypoints[mp_pose.PoseLandmark.LEFT_HIP.value]
    knee = keypoints[mp_pose.PoseLandmark.LEFT_KNEE.value]
    ankle = keypoints[mp_pose.PoseLandmark.LEFT_ANKLE.value]
    
    knee_angle = calculate_angle(hip, knee, ankle)
    
    if knee_angle > 160:
        feedback_text = "Squat deeper!"
    elif knee_angle < 90:
        feedback_text = "You're too deep!"
    else:
        feedback_text = "Good squat!"

def pushup_feedback(keypoints):
    global feedback_text
    if len(keypoints) < 33:
        feedback_text = "Make sure your whole body is visible!"
        return
    
    shoulder = keypoints[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
    elbow = keypoints[mp_pose.PoseLandmark.LEFT_ELBOW.value]
    wrist = keypoints[mp_pose.PoseLandmark.LEFT_WRIST.value]
    
    elbow_angle = calculate_angle(shoulder, elbow, wrist)
    
    if elbow_angle > 160:
        feedback_text = "Lower your body more!"
    elif elbow_angle < 90:
        feedback_text = "Push up more!"
    else:
        feedback_text = "Good push-up!"

def lunge_feedback(keypoints):
    global feedback_text
    if len(keypoints) < 33:
        feedback_text = "Make sure your whole body is visible!"
        return
    
    hip = keypoints[mp_pose.PoseLandmark.LEFT_HIP.value]
    knee = keypoints[mp_pose.PoseLandmark.LEFT_KNEE.value]
    ankle = keypoints[mp_pose.PoseLandmark.LEFT_ANKLE.value]
    
    knee_angle = calculate_angle(hip, knee, ankle)
    
    if knee_angle > 150:
        feedback_text = "Lower your back knee more!"
    elif knee_angle < 90:
        feedback_text = "Too low! Maintain proper form."
    else:
        feedback_text = "Good lunge!"

def generate_frames():
    global latest_keypoints, feedback_text, selected_exercise
    while True:
        success, frame = cap.read()
        if not success:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)
        frame = cv2.cvtColor(frame_rgb, cv2.COLOR_RGB2BGR)

        if results.pose_landmarks:
            keypoints = [
                {"id": i, "x": lm.x, "y": lm.y, "z": lm.z, "visibility": lm.visibility}
                for i, lm in enumerate(results.pose_landmarks.landmark)
            ]
            latest_keypoints = keypoints
            
            if selected_exercise == "squats":
                squat_feedback(keypoints)
            elif selected_exercise == "pushups":
                pushup_feedback(keypoints)
            elif selected_exercise == "lunges":
                lunge_feedback(keypoints)
            else:
                feedback_text = "Select an exercise!"

            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      landmark_drawing_spec=mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, 
                                                                                   circle_radius=3),
                                      connection_drawing_spec=mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2))

        cv2.putText(frame, feedback_text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return "Welcome to Pose Correction!"

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/keypoints')
def get_keypoints():
    global latest_keypoints, feedback_text
    return jsonify({"keypoints": latest_keypoints, "feedback": feedback_text})

@app.route('/feedback')
def get_feedback():
    global feedback_text
    return jsonify({"feedback": feedback_text})

@app.route('/exercise', methods=['POST'])
def set_exercise():
    global selected_exercise
    data = request.get_json()
    selected_exercise = data.get("exercise")
    return jsonify({"message": "Exercise updated successfully!", "exercise": selected_exercise})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)