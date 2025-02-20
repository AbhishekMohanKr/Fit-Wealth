import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

const Notifications = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert(remoteMessage.notification.title);
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Notifications Enabled</Text>
    </View>
  );
};

export default Notifications;