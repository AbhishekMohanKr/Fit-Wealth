import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CryptoMining = () => {
  const [steps, setSteps] = useState(0);
  const [reward, setReward] = useState(0);

  const handleWorkout = () => {
    let newSteps = steps + Math.floor(Math.random() * 1000);
    setSteps(newSteps);
    setReward(newSteps * 0.001);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Mining</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Steps:</Text>
        <Text style={styles.value}>{steps}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Pi Coins Earned:</Text>
        <Text style={styles.value}>{reward.toFixed(4)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleWorkout}>
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
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71', // Green for positive values
  },
  button: {
    backgroundColor: '#ff6347', // Tomato color for energy
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CryptoMining;
