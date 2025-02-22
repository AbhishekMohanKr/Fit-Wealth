import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './src/screens/AuthScreen';
import UserProfile from './src/screens/UserProfile';
import WorkoutMenu from './src/screens/WorkoutMenu';
import Notifications from './src/screens/Notifications';
import CryptoMining from './src/screens/CryptoMining';
import ExerciseScreen from './src/screens/ExerciseScreen';
import WebRTCStream from './src/screens/WebRTCStream';
import ChatScreen from './src/screens/ChatScreen';
import UserDashboard from './src/screens/UserDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={UserDashboard} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen name="Workout" component={WorkoutMenu} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Crypto" component={CryptoMining} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
