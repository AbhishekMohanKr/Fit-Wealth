import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function HomeScreen() {
  const theme = useColorScheme();
  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black' }]}>
        Welcome to Home Screen 🏠
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});
