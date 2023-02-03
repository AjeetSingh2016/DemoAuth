import {View, Text, Button, Alert,} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const navigation = useNavigation();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const warningAlert = () =>
  Alert.alert('Warning', 'Are you sure you want to leave?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => logOut()},
  ]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}>
      <Button title="Log Out" onPress={() => {
        warningAlert();
      }} />
    </View>
  );
};

export default Home;
