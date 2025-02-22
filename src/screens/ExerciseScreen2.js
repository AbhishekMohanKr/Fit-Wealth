import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ExerciseScreen2 = () => {
  const webViewRef = useRef(null);
  const [poseDetected, setPoseDetected] = useState(false);

  const webScript = `
    (async () => {
      // Load TensorFlow.js and Pose Detection Model
      await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
      const poseDetection = await import('https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection');

      // Create Video Element for Camera Feed
      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('playsinline', '');
      document.body.appendChild(video);

      // Request Camera Access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      // Wait for Video to be Ready
      await new Promise((resolve) => (video.onloadeddata = resolve));

      // Load Pose Detection Model
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
        modelType: 'Lightning',
      });

      // Function to Detect Poses
      async function detectPose() {
        const poses = await detector.estimatePoses(video);
        if (poses.length > 0) {
          window.ReactNativeWebView.postMessage("Pose Detected");
        } else {
          window.ReactNativeWebView.postMessage("No Pose");
        }
        requestAnimationFrame(detectPose);
      }

      // Start Pose Detection
      detectPose();
    })();
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{
          html: `<html>
          <body>
            <script>${webScript}</script>
          </body>
          </html>`,
        }}
        onMessage={(event) => setPoseDetected(event.nativeEvent.data === 'Pose Detected')}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Pose Detected: {poseDetected ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  text: { color: '#fff', fontSize: 18 },
});

export default ExerciseScreen2;
