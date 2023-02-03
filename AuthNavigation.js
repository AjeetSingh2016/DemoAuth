import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import auth from '@react-native-firebase/auth';

const AuthNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return <>{user ? <SignedInStack /> : <SignedOutStack />}</>;
}

export default AuthNavigation