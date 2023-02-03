import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {
    responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Category = ({data}) => {
  return (
    <TouchableOpacity
      style={{
        height: responsiveHeight(22),
        width: responsiveWidth(42),
        borderRadius: responsiveWidth(2.5),
        marginLeft: responsiveWidth(2.5),
        
        
      }}>
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          justifyContent: "flex-end"
        
        }}
        imageStyle={{ borderRadius: 6,}}
        source={{
          uri: data.url,
        }}>
            <Text style={{color: "white", fontSize: responsiveFontSize(2.2), fontWeight: "500", textAlign: "center", marginBottom: 2}}>{data.name}</Text>
        </ImageBackground>
    </TouchableOpacity>
  );
};

export default Category;
