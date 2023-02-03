import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import Home from './src/screen/Home';
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedOutStack= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="SignUpScreen">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: 'true',
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
