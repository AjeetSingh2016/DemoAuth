import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import welcomeIcon from '../constants/image/welcome.png';
import React, {useState, useEffect} from 'react';
import {COLORS, SHADOWS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import validator from 'validator';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const socialService = {
  google: {
    title: 'Continue with Google',
    icon: 'https://img.icons8.com/color/48/null/google-logo.png',
  },
  facebook: {
    title: 'Continue with Facebook',
    icon: 'https://img.icons8.com/color/48/null/facebook-new.png',
  },
};
const SocialButton = ({data, func}) => (
  <TouchableOpacity
    style={{
      display: 'flex',
      flexDirection: 'row',
      width: '85%',
      height: 50,
      alignItems: 'center',
      backgroundColor: '#272727',
      borderRadius: 8,
      marginTop: 20,
    }}
    onPress={() => {
      func();
    }}>
    <Image
      style={styles.iconStyle}
      source={{
        uri: data.icon,
      }}
    />
    <Text style={{color: 'white'}}>{data.title}</Text>
  </TouchableOpacity>
);

const LoginForm = () => {



  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
    });
  }



  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '695890862809-0to9umbj3u9r44ag70qg9f8cnbhjtuir.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    await GoogleSignin.signOut();
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userSiginIn = auth().signInWithCredential(googleCredential);
    userSiginIn
      .then(data => {

        firestore.collection('Users').doc('fK3ddutEpD2qQqRMXNW5').get()
        firestore()
        .collection('Users')
        .add({
          user_id: data.user.uid,
          username: data.user.displayName,
          email: data.user.email,
        })
        .then(() => {
          console.log('User added!');
      });
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const onLogin = () => {


    // Validation
    if(password == "" || email == ""){
      showToast("Sections can not be leave empty")
      return;
    }

    if(password.length <= 0){
      Toast.show({
        type: 'error',
        text1: 'Password should be at least 6 characters long',
      });
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);

        // firestore()
        //   .collection('Users')
        //   .add({
        //     user_id: data.user.uid,
        //     username: username,
        //     email: data.user.email,
        //   })
        //   .then(() => {
        //     console.log('User added!');
        //   });
      })

      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          showToast("Email is invalid")

        }
        
        if (error.code === 'auth/user-not-found') {
          showToast("User not found")

        }

        if (error.code === 'auth/wrong-password') {
          showToast("Password or Email is incorrect!")
        }

        // console.error(error);
      });
  };

  // return (

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={welcomeIcon} />
        <Text style={styles.title}>Hey! Welcome</Text>
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={stylesTwo.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          style={stylesTwo.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={stylesTwo.loginBtn}
          onPress={onLogin}>
          <Text style={stylesTwo.loginText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <Text style={{textAlign: 'center', color: COLORS.second, marginTop: 15}}>
        Or
      </Text>

      <View style={styles.buttonContainer}>
        <SocialButton data={socialService.google} func={onGoogleButtonPress} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{textAlign: 'center', color: 'green', marginTop: 50}}>
           Dont have any account, Create account!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 7,
  },
  image: {
    aspectRatio: 1,
    height: '70%',
  },
  imageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35%',
    // backgroundColor: "red",
    paddingVertical: 5,
    zIndex: -10,
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  subTitle: {
    alignItems: 'center',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  iconStyle: {
    height: 25,
    aspectRatio: 1,
    marginRight: 8,
    marginLeft: 8,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    height: '30%',
    alignItems: 'center',
  },
});

const stylesTwo = StyleSheet.create({
  image: {
    marginBottom: 40,
  },
  inputView: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    display: 'flex',
    width: '85%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
  loginBtn: {
    display: 'flex',
    width: '75%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272727',
    borderRadius: 15,
    marginTop: 20,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginForm;
