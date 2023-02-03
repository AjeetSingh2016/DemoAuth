import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  Linking,
} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ArticleCard = ({articleData}) => {
  let imageURl;

  if (articleData.urlToImage) {
    imageURl = articleData.urlToImage;
  } else {
    imageURl = 'https://demofree.sirv.com/nope-not-here.jpg';
  }

  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row-reverse',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
          width: '65%',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{height: '80%'}}
          onPress={() => Linking.openURL(articleData.url)}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.8),
              textTransform: 'capitalize',
            }}>
            {articleData.title}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            height: '20%',
            justifyContent: 'center',
            // backgroundColor: 'red',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', textTransform: 'capitalize'}}>
            {moment(articleData.publishedAt).fromNow()}
          </Text>

          <View
            style={{
              width: '40%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{height: '75%'}}>
              <Image
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  tintColor: 'grey',
                }}
                source={{
                  uri: 'https://img.icons8.com/material/24/null/bookmark-outline.png',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{height: '75%'}}>
              <Image
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  tintColor: 'grey',
                }}
                source={{
                  uri: 'https://img.icons8.com/ios-glyphs/30/null/share--v1.png',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
          width: '35%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: '80%',
            aspectRatio: 1,
            borderRadius: 10,
          }}
          source={{
            uri: imageURl,
          }}
        />
      </View>
    </View>
  );
};

export default ArticleCard;
