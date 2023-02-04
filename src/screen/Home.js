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
import Header from '../components/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector, useDispatch} from 'react-redux';
import {fetchData} from '../redux/actions/Actions';

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
  const dispatch = useDispatch();
  const {loading, newsData, profileToggle} = useSelector(
    state => state.FetchData,
  );
  useEffect(() => {

    dispatch(fetchData());
  }, []);

  const navigation = useNavigation();

  if (!loading) {
    return (
      <View style={{flex: 1}}>
        <Header/>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingBottom: 5,
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
              {newsData.map((item, indx) => (
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
