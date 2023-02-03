import {View, Text, Image, TouchableOpacity,Alert} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';

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

const Profile = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        right: 8,
        top: 5,
        height: responsiveHeight(15),
        width: responsiveWidth(55),
        borderRadius: responsiveWidth(5),
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '40%',
          height: '100%',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          style={{height: '45%', resizeMode: 'contain'}}
          source={{
            uri: 'https://img.icons8.com/ios-filled/100/null/user-male-circle.png',
          }}
        />
      </View>
      <View
        style={{
          width: '60%',
          height: '100%',
          paddingVertical: 5,
          justifyContent: 'center',
        }}>
        <View style={{height: '80%', justifyContent: 'space-around'}}>
          <Text style={{color: 'black', height: '20%', fontWeight: '500', textAlign: "center"}}>
            User's Name
          </Text>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: 24,
                aspectRatio: 1,
                tintColor: 'lightgreen',
                marginRight: 5,
              }}
              source={{
                uri: 'https://img.icons8.com/material/24/null/bookmark-outline.png',
              }}
            />
            <Text
              style={{color: 'black', fontSize: responsiveScreenFontSize(1.8)}}>
              Bookmarks
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
              warningAlert()
          }}>
            <Image
              style={{
                height: 25,
                aspectRatio: 1,
                tintColor: 'red',
                marginRight: 5,
              }}
              source={{
                uri: 'https://img.icons8.com/material-outlined/24/null/logout-rounded.png',
              }}
            />
            <Text
              style={{color: 'black', fontSize: responsiveScreenFontSize(1.8)}}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>;
