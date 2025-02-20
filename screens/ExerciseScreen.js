import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import cv2 from 'opencv.js';

const ExerciseScreen = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loadOpenCV = async () => {
      try {
        console.log('🔄 Initializing OpenCV...');
        if (!cv2) {
          throw new Error('OpenCV.js not loaded');
        }
        console.log('✅ OpenCV Ready!');
      } catch (error) {
        console.error("❌ OpenCV Error:", error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOpenCV();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OpenCV Debugging</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>Error: {errorMessage}</Text>
      ) : (
        <Text style={styles.successText}>✅ OpenCV Loaded Successfully!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseScreen;