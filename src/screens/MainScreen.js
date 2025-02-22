import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>
      
      {/* Welcome Section */}
      <Animatable.View animation="fadeInDown" delay={500} style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to <Text style={{ color: '#ff8c00' }}>FitVerse</Text> 🚀</Text>
        <Text style={styles.description}>
          Achieve your fitness goals with AI-powered workouts, real-time form correction, 
          meal planning, and earn rewards while staying fit!
        </Text>
      </Animatable.View>

      {/* Quick Action Buttons */}
      <Animatable.View animation="fadeInUp" delay={700} style={styles.quickActions}>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('Exercise')}
          activeOpacity={0.7}
        >
          <Icon name="dumbbell" size={30} color="#fff" />
          <Text style={styles.buttonText}>Start Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.7}
        >
          <Icon name="robot-outline" size={30} color="#fff" />
          <Text style={styles.buttonText}>Go to Chatbot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.7}
        >
          <Icon name="chart-line" size={30} color="#fff" />
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  quickActions: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 15,
    width: width * 0.85,
    justifyContent: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 12,
    fontWeight: 'bold',
  },
});

export default MainScreen;
