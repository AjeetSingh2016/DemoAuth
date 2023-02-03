import {View, Text} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SideMenu = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: responsiveHeight(100),
        right: 0,
        width: responsiveWidth(15),
        backgroundColor: 'red',
        backgroundColor: "green",
      }}>
      <Text>SideMenu</Text>
    </View>
  );
};

export default SideMenu;
