import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, SHADOWS, SIZES } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_PROFILE, SET_PROFILE } from '../redux/ActionTypes';

LogoTitle = () => (
    <View
        style={{
            height: '100%',
            justifyContent: 'center',
            paddingLeft: responsiveWidth(2),
        }}>
        <Text
            style={{
                color: 'black',
                fontSize: responsiveFontSize(2.5),
                fontWeight: '500',
            }}>
            The Globe
        </Text>
    </View>
);

const Header = () => {

    const dispatch = useDispatch();
    const {loading, newsData, profileToggle} = useSelector(
        state => state.FetchData,
      );


    return (
        <View
            style={{
                width: '100%',
                height: responsiveHeight(7),
                backgroundColor: 'white',
                ...SHADOWS.medium,
                flexDirection: "row",
                justifyContent: "space-between",

            }}>
            <LogoTitle />
            <View style={{ height: "100%", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        if(profileToggle){
                            dispatch({ type: CLOSE_PROFILE });
                        }
                        else{
                            dispatch({ type: SET_PROFILE });
                        }
                    }}
                    style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        width: 100,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={{
                            uri: 'https://img.icons8.com/ios-filled/100/null/user-male-circle.png',
                        }}
                    />
                    <Image
                        style={{ width: 30, height: 30, tintColor: '#60AEFF' }}
                        source={{
                            uri: 'https://img.icons8.com/ios-filled/50/null/menu-rounded.png',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
