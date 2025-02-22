import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Tts from 'react-native-tts';
import FastImage from 'react-native-fast-image';

const ExerciseScreen = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showLiveFeed, setShowLiveFeed] = useState(false); // Toggle for video feed
    const [feedback, setFeedback] = useState('');
    const lastSpokenFeedback = useRef('');

    const flaskServerURL = 'http://172.16.3.23:5000'; // Replace with your Flask server IP
    const videoFeedURL = `${flaskServerURL}/video_feed`;
    const feedbackURL = `${flaskServerURL}/keypoints`;
    const exerciseURL = `${flaskServerURL}/exercise`;

    // Exercise GIFs (local & remote)
    const exerciseGIFs = {
        squats: require('../assets/squats.gif'),
        pushups: require('../assets/pushup.gif' ),
        lunges: require('../assets/lunges.gif')
    };

    const sendExerciseToBackend = async (exercise) => {
        try {
            const response = await fetch(exerciseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ exercise }),
            });
            const result = await response.json();
            console.log('Exercise sent successfully:', result);
        } catch (error) {
            console.error('Error sending exercise:', error);
        }
    };

    useEffect(() => {
        if (selectedExercise) {
            const interval = setInterval(() => {
                fetch(feedbackURL)
                    .then(response => response.json())
                    .then(data => {
                        if (data.feedback && data.feedback !== feedback) {
                            setFeedback(data.feedback);
                            if (data.feedback !== lastSpokenFeedback.current) {
                                Tts.speak(data.feedback);
                                lastSpokenFeedback.current = data.feedback;
                            }
                        }
                    })
                    .catch(error => console.error("Error fetching feedback:", error));
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [selectedExercise, feedback]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select an Exercise</Text>
            <View style={styles.exerciseList}>
                {['squats', 'pushups', 'lunges'].map((exercise) => (
                    <TouchableOpacity
                        key={exercise}
                        style={[styles.button, selectedExercise === exercise && styles.selectedButton]}
                        onPress={() => {
                            setSelectedExercise(exercise);
                            setShowLiveFeed(false); // Show GIF first
                            sendExerciseToBackend(exercise);
                        }}
                    >
                        <Text style={styles.buttonText}>{exercise.charAt(0).toUpperCase() + exercise.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedExercise && !showLiveFeed && (
                <View style={styles.imageContainer}>
                    <Text style={styles.exerciseText}>Watch the Exercise</Text>
                    <FastImage 
                        source={exerciseGIFs[selectedExercise]} 
                        style={styles.exerciseGif} 
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <TouchableOpacity 
                        style={styles.startButton} 
                        onPress={() => setShowLiveFeed(true)} // Switch to live feed
                    >
                        <Text style={styles.buttonText}>Start Exercise</Text>
                    </TouchableOpacity>
                </View>
            )}

            {showLiveFeed && (
                <View style={styles.videoContainer}>
                    <Text style={styles.exerciseText}>Perform: {selectedExercise}</Text>
                    <WebView source={{ uri: videoFeedURL }} style={styles.videoFeed} />
                    <Text style={styles.feedbackText}>{feedback}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20, 
        color: '#000'
    },
    exerciseList: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    button: {
        padding: 15,
        margin: 10,
        backgroundColor: '#007bff',
        borderRadius: 8
    },
    selectedButton: {
        backgroundColor: '#0056b3'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    exerciseText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, 
                color : '#000'
    },
    exerciseGif: {
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    startButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 8
    },
    videoContainer: {
        alignItems: 'center',
        marginTop: 20, 
        height: 300,
        width : 400

    },
    videoFeed: {
        width: 300,
        height: 400
    },
    feedbackText: {
        fontSize: 16,
        color: '#d9534f',
        marginTop: 10
    }
});

export default ExerciseScreen;
