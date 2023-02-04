import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SHADOWS, SIZES} from '../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const optionsData = [
  {
    name: 'home',
    imgURL: 'https://img.icons8.com/material-outlined/96/null/home--v2.png',
  },
  {
    name: 'International',
    imgURL: 'https://img.icons8.com/material-outlined/96/null/geography.png',
  },
  {
    name: 'Education',
    imgURL:
      'https://img.icons8.com/material-outlined/96/null/school-building.png',
  },
  {
    name: 'Sports',
    imgURL: 'https://img.icons8.com/material-outlined/96/null/football2.png',
  },
  {
    name: 'Business',
    imgURL: 'https://img.icons8.com/material-outlined/96/null/suitcase.png',
  },
  {
    name: 'More',
    imgURL: 'https://img.icons8.com/material-outlined/96/null/more.png',
  },
];

OptionIcon = ({data}) => (
  <TouchableOpacity
    style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: responsiveHeight(4),
      display: 'flex',
    }}>
    <Image
      style={{width: 30, height: 30, tintColor: '#60AEFF'}}
      source={{
        uri: data.imgURL,
      }}
    />
    <Text style={{color: 'black', fontSize: responsiveFontSize(1.2)}}>
      {data.name}
    </Text>
  </TouchableOpacity>
);

const SideMenu = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: responsiveHeight(100),
        right: 0,
        width: responsiveWidth(16),
        backgroundColor: 'white',
        marginTop: responsiveHeight(7),
        ...SHADOWS.dark
      }}>
      {optionsData.map((item, indx) => (
        <OptionIcon key={indx} data={item} />
      ))}
    </View>
  );
};

export default SideMenu;
