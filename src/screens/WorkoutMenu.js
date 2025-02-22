import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const WorkoutMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Menu</Text>

      <Image
        source={{ uri: 'https://example.com/workout.gif' }}
        style={styles.image}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crypto')}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff6347', // Tomato color for energy
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutMenu;
