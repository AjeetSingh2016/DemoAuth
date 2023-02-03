import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import Home from './src/screen/Home';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Stack = createNativeStackNavigator();

LogoTitle = () => (
  <Text
    style={{
      color: 'black',
      fontSize: responsiveFontSize(2.5),
      fontWeight: '500',
    }}>
    The Globe
  </Text>
);

RightContent = () => (
  <TouchableOpacity>
    <Image
      onPree
      style={{width: 30, height: 30}}
      source={{
        uri: 'https://img.icons8.com/ios-filled/50/null/menu-rounded.png',
      }}
    />
  </TouchableOpacity>
);

const screenOptions = {
  headerShown: true,
};

export const SignedOutStack = () => {
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
            headerTitle: props => <LogoTitle />,
            headerRight: () => <RightContent />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
