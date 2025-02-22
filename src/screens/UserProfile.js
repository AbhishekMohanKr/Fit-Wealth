import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const UserProfile = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>John Ferguson 🏃</Text>
      <Text style={styles.subtitle}>Baltimore sprinter</Text>

      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with a real image URL
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.statText}>34 Average Steps</Text>
        <Text style={styles.statText}>7359 Calories Burned</Text>
        <Text style={styles.statText}>152,253 Total Steps</Text>
      </View>

      <Text style={styles.sectionTitle}>Friends</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['Andrew', 'Shawn', 'Lucy', 'Alex', 'Tony'].map((friend, index) => (
          <View key={index} style={styles.friendContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Replace with real image URLs
              style={styles.friendImage}
            />
            <Text>{friend}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Goals</Text>
      <View style={styles.goalsContainer}>
        <Text style={styles.goalItem}>Weight: 76 kg</Text>
        <Text style={styles.goalItem}>Activity Goal: 2000 steps</Text>
        <Text style={styles.goalItem}>15 Activities</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder='Age'
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder='Height (cm)'
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder='Weight (kg)'
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        onChangeText={setWeight}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Workout')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.visitButton} onPress={() => alert('Visit Site Clicked!')}>
        <Text style={styles.visitButtonText}>Visit Site</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statText: {
    fontSize: 16,
    marginVertical: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  friendContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  goalsContainer: {
    marginBottom: 20,
  },
  goalItem: {
    fontSize: 16,
    marginVertical: 2,
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  visitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;