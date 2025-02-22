import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Profile'))
      .catch(error => alert(error.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join us to get started</Text>

      <TextInput
        style={styles.input}
        placeholder='Full Name'
        placeholderTextColor="#aaa"
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity 
        style={styles.termContainer} 
        onPress={() => setAgreeTerms(!agreeTerms)}
      >
        <Text style={styles.termText}>
          <Text style={styles.termCheck}>{agreeTerms ? '☑️' : '☐'}</Text> 
          I agree to the terms and conditions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={!agreeTerms}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign up with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Text style={styles.socialButtonText}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Text style={styles.socialButtonText}>F</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>Log in</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9f5f6',
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007BFF ',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  termContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termText: {
    fontSize: 14,
    color: '#666',
  },
  termCheck: {
    marginRight: 5,
  },
  button: {
    backgroundColor: '#449DD1',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    color: '#666',
  },
  footerLink: {
    color: '#ff4081',
    fontWeight: 'bold',
  },
});

export default AuthScreen;