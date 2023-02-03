import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SignupForm from '../components/SignupForm'

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register! 🚀</Text>
      </View>
      <SignupForm />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  titleContainer: {
    // flex: 1,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
});

export default Register