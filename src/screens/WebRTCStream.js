import React, { useState } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import Video from "react-native-video";

const WebRTCStream = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);

  const pickVideo = () => {
    const options = {
      mediaType: "video",
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelled", "Video selection was cancelled.");
      } else if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
      } else if (!response.assets || response.assets.length === 0) {
        Alert.alert("Error", "No video selected.");
      } else {
        const selectedVideoUri = response.assets[0].uri;
        setVideoUri(selectedVideoUri);
        await uploadVideo(selectedVideoUri);
      }
    });
  };

  const uploadVideo = async (videoUri) => {
    const formData = new FormData();
    formData.append("video", {
      uri: videoUri,
      name: "video.mp4",
      type: "video/mp4",
    });

    try {
      const response = await axios.post("http://192.168.29.169:5000/process_video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.processed_video_url) {
        setProcessedVideo(response.data.processed_video_url);
      } else {
        Alert.alert("Error", "Processing failed.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Failed to upload video");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Video" onPress={pickVideo} />

      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          controls
          resizeMode="contain"
        />
      )}

      {processedVideo && (
        <Video
          source={{ uri: processedVideo }}
          style={styles.video}
          controls
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  video: {
    width: "90%",
    height: 300,
    marginTop: 20,
    backgroundColor: "#000",
  },
});

export default WebRTCStream;
