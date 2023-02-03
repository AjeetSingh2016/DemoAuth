import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import Category from '../components/Category';
import Profile from '../components/Profile';
import SideMenu from '../components/SideMenu';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

HeaderButton = ({setProfileToggle, profileToggle}) => (
  <TouchableOpacity
    onPress={() => setProfileToggle(!profileToggle)}
    style={{
      flexDirection: 'row',
      // backgroundColor: 'red',
      width: 100,
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
    <Image
      style={{width: 30, height: 30}}
      source={{
        uri: 'https://img.icons8.com/ios-filled/100/null/user-male-circle.png',
      }}
    />
    <Image
      style={{width: 30, height: 30}}
      source={{
        uri: 'https://img.icons8.com/ios-filled/50/null/menu-rounded.png',
      }}
    />
  </TouchableOpacity>
);

const categoryData = [
  {
    name: 'Weather',
    url: 'https://picsum.photos/id/459/600/400?blur',
  },
  {
    name: 'Technology',
    url: 'https://picsum.photos/id/201/600/400?blur',
  },
  {
    name: 'Sports',
    url: 'https://picsum.photos/id/73/600/400?blur',
  },
  {
    name: 'Entertainment',
    url: 'https://picsum.photos/id/453/600/400?blur',
  },
];

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileToggle, setProfileToggle] = useState(false);

  const getData = async () => {
    try {
      const URL =
        'https://newsapi.org/v2/top-headlines?country=in&apiKey=363d7942260b46b3bdc1fd2f5dad2821';
      const {
        data: {articles},
      } = await axios.get(URL);
      setData(articles);
      console.log(articles);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          setProfileToggle={setProfileToggle}
          profileToggle={profileToggle}
        />
      ),
    });
  }, [profileToggle]);

  if (!loading) {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingBottom: 5,
              // position: 'absolute',
              zIndex: -1,
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: responsiveWidth(2.5),
                  marginVertical: responsiveHeight(2),
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '500',
                }}>
                Popular Category
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {categoryData.map((item, idx) => (
                  <Category key={idx} data={item} />
                ))}
              </ScrollView>
            </View>

            <View style={{paddingHorizontal: responsiveWidth(2.5)}}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: responsiveWidth(2.5),
                  marginVertical: responsiveHeight(2),
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '500',
                }}>
                Today's Top Picks
              </Text>
              {data.map((item, indx) => (
                <ArticleCard key={indx} articleData={item} />
              ))}
            </View>
          </View>
        </ScrollView>
        {profileToggle ? <Profile /> : ''}
        <SideMenu />
      </View>
    );
  } else {
    return <Loading />;
  }
};

export default Home;
