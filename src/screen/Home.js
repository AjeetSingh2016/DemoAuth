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

const newsData = [
  {
    source: {
      id: null,
      name: 'News18',
    },
    author: 'Entertainment Bureau',
    title:
      'Entertainment News LIVE Updates: Sidharth-Kiara Wedding on Feb 6, Confirms Karan Johar; Couple Spending Rs - News18',
    description:
      "Entertainment News LIVE Updates: RRR star Ram Charan is likely to attend Kiara Advani and Sidharth Malhotra's wedding in Jaisalmer.",
    url: 'https://www.news18.com/news/movies/entertainment-news-sidharth-malhotra-kiara-advani-wedding-pathaan-rashmika-mandanna-shark-tank-kangana-livenews-6992047.html',
    urlToImage:
      'https://images.news18.com/ibnlive/uploads/2023/02/kiara-advani-sidharth-malhotra-sid-kiara-wedding-bollywood-167548524816x9.jpg',
    publishedAt: '2023-02-04T04:37:04Z',
    content:
      'office. On the other hand, the Indian film industry has been left shattered by the death of legendary filmmaker K Viswanath. Several film personalities including Jr NTR, Anil Kapoor, Chiranjeevi, SS … [+1169 chars]',
  },
  {
    source: {
      id: null,
      name: 'Hindustan Times',
    },
    author: 'Ritu Maria Johny',
    title:
      "Naked woman with ‘mental health’ issues rings doorbells at night in UP's Rampur - Hindustan Times",
    description:
      'The CCTV footage allegedly showed the woman roaming around the streets of Milak village in Rampur. | Latest News India',
    url: 'https://www.hindustantimes.com/india-news/naked-woman-with-mental-health-issues-rings-doorbells-at-night-in-up-s-rampur-101675476693936.html',
    urlToImage:
      'https://images.hindustantimes.com/img/2023/02/04/1600x900/naked_woman_rampur_1675477258815_1675477258995_1675477258995.jpg',
    publishedAt: '2023-02-04T03:33:03Z',
    content:
      'After a purported video of a naked woman ringing doorbells of multiple houses in Rampur, Uttar Pradesh, was circulated on social media, police issued a statement on Saturday saying the lady has been … [+2038 chars]',
  },
  {
    source: {
      id: null,
      name: 'CNBCTV18',
    },
    author: 'CNBCTV18.com',
    title:
      'World Cancer Day 2023: Debunking 5 myths about the disease - CNBCTV18',
    description:
      'Patient education and clarification of myths about cancer are important for cancer treatment and achieving optimal survival outcomes. Awareness about the disease is essential as every year more than 8 million people die from different types of cancer in the w…',
    url: 'https://www.cnbctv18.com/healthcare/world-cancer-day-2023-debunking-five-myths-about-the-disease-15824411.htm',
    urlToImage:
      'https://images.cnbctv18.com/wp-content/uploads/2022/09/cancer1-1019x573.jpg',
    publishedAt: '2023-02-04T03:15:16Z',
    content:
      'Next Article\r\nWorld Cancer Day 2023 | History, significance, theme and other details',
  },
  {
    source: {
      id: null,
      name: 'NDTV News',
    },
    author: null,
    title:
      'After US, 2nd Chinese Balloon Spotted In Latin America: Pentagon - NDTV',
    description:
      'A Chinese spy balloon was flying over Latin America, the Pentagon said Friday night, one day after a similar craft was seen over US skies.',
    url: 'https://www.ndtv.com/world-news/us-says-second-chinese-spy-balloon-spotted-in-latin-america-3752020',
    urlToImage:
      'https://c.ndtvimg.com/2023-02/v6lsioag_chinese-spy-balloon-over-us_625x300_03_February_23.jpg',
    publishedAt: '2023-02-04T03:07:00Z',
    content:
      'This comes a day after a similar craft was seen over US skies. (File)\r\nWashington: A Chinese spy balloon has been spotted over Latin America, the Pentagon said Friday, a day after a similar craft was… [+4939 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Tushar Tere',
    title:
      "Border-Gavaskar Trophy: Barodian teaboy's spin casts spell on Australia batsmen - Indiatimes.com",
    description:
      "Cricket News: As part of a ‘secret' training camp in Alur, the Aussies have flown in 21-year-old spinner and former tea seller, Mahesh Pithiya, a rare Ravichandran",
    url: 'https://timesofindia.indiatimes.com/sports/cricket/australia-in-india/border-gavaskar-trophy-barodian-teaboys-spin-casts-spell-on-australia-batsmen/articleshow/97593941.cms',
    urlToImage:
      'https://static.toiimg.com/thumb/msid-97593875,width-1070,height-580,imgsize-60694,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2023-02-04T03:07:00Z',
    content:
      'Imitators, doctored pitches and throwdown specialists ... get an exclusive inside look at the lengths Australia are https://t.co/5ooyMwZbAx\r\n— cricket.com.au (@cricketcomau) 1675387557000',
  },
  {
    source: {
      id: null,
      name: 'GSMArena.com',
    },
    author: 'Vlad',
    title:
      'OnePlus 11 memory, storage, and color options for India revealed - GSMArena.com news - GSMArena.com',
    description: 'The phone is becoming official on February 7.',
    url: 'https://www.gsmarena.com/oneplus_11_memory_storage_and_color_options_for_india_revealed-news-57443.php',
    urlToImage:
      'https://fdn.gsmarena.com/imgroot/news/23/02/oneplus-11-ram-in-india/-952x498w6/gsmarena_000.jpg',
    publishedAt: '2023-02-04T02:56:01Z',
    content:
      'OnePlus is announcing the OnePlus 11 for global markets, including India, on February 7. If you were wondering what RAM/storage versions it will be offered in for the Indian market, and in what color… [+1120 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Bloomberg',
    title:
      "Inside the 19-hour meltdown that junked Gautam Adani's share sale - Indiatimes.com",
    description:
      'India Business News: Gautam Adani chose to forgo the short-term victory of nailing the follow-on offer of Adani Enterprises to protect his longer term relationships with m',
    url: 'https://timesofindia.indiatimes.com/business/india-business/gautam-adani-hindenburg-research-adani-enterprises-fpo-adani-stocks/articleshow/97593367.cms',
    urlToImage:
      'https://static.toiimg.com/thumb/msid-97593406,width-1070,height-580,imgsize-27782,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2023-02-04T02:50:00Z',
    content:
      'FD Calculator\r\nWhen investing in a fixed deposit, the amount you deposit earns interest as per the prevailing...\r\nCalculate Now',
  },
  {
    source: {
      id: null,
      name: 'NDTV News',
    },
    author: null,
    title:
      '"Action Might Not Be Palatable": Supreme Court Warns Centre Amid Tussle - NDTV',
    description:
      "The Centre on Friday gave an assurance that the Collegium's pending recommendations for the elevation of five high court judges to the Supreme Court will be cleared soon.",
    url: 'https://www.ndtv.com/india-news/supreme-court-warns-centre-amid-tussle-action-might-not-be-palatable-3750935',
    urlToImage:
      'https://c.ndtvimg.com/2020-03/voni7s98_supreme-court-new_650x400_12_March_20.jpg',
    publishedAt: '2023-02-04T02:26:01Z',
    content:
      'Earlier, the Supreme Court had said the Centre should appoint judges within three-four weeks\r\nNew Delhi: Facing some tough questions from the Supreme Court, the Centre on Friday gave an assurance tha… [+6777 chars]',
  },
  {
    source: {
      id: 'espn-cric-info',
      name: 'ESPN Cric Info',
    },
    author: 'ESPNcricinfo staff',
    title:
      'Australia aware of reverse-swing threat amid spin talk - ESPNcricinfo',
    description:
      'Alex Carey said it will be down to each batter to find out the method and tempo which works best for them',
    url: 'https://www.espncricinfo.com/story/ind-vs-aus-alex-carey-wary-of-the-reverse-swing-danger-from-india-not-just-spin-1357204',
    urlToImage:
      'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/350500/350527.6.jpg',
    publishedAt: '2023-02-04T02:12:00Z',
    content:
      'NewsAlex Carey said it will be down to each batter to find out the method and tempo which works best for them',
  },
  {
    source: {
      id: null,
      name: 'NDTV News',
    },
    author: null,
    title:
      '"Warned Uddhav Thackeray About Rebellion But...": Ex Maharashtra Minister - NDTV',
    description:
      "Nearly eight months after the split in the Shiv Sena, NCP leader Ajit Pawar on Friday claimed that then Chief Minister Uddhav Thackeray was 'warned' about a rebellion brewing in the ranks but he failed to act on it.",
    url: 'https://www.ndtv.com/india-news/warned-uddhav-thackeray-about-rebellion-but-ex-maharashtra-minister-ajit-pawar-3751917',
    urlToImage:
      'https://c.ndtvimg.com/2020-01/lke8gmb8_ajit-pawar-uddhav-thackeray-pti-_650x400_02_January_20.jpg',
    publishedAt: '2023-02-04T01:58:00Z',
    content:
      'Uddhav Thackeray said he had full confidence in his MLAs, said Ajit Pawar (FILE)\r\nPune (Maharashtra): Nearly eight months after the split in the Shiv Sena, which eventually led to the collapse of the… [+2384 chars]',
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Bloomberg',
    title:
      '‘Teflon’ Elon Musk wins again as jury rejects Tesla tweet fraud claims - Times of India',
    description:
      'International Business News: Elon Musk was found not guilty of fraud in a proposed deal to take Tesla private. The nine-member jury reached its verdict after less than two hours o',
    url: 'https://timesofindia.indiatimes.com/business/international-business/elon-musk-found-not-guilty-of-fraud-over-2018-tesla-tweet/articleshow/97592584.cms',
    urlToImage:
      'https://static.toiimg.com/thumb/msid-97593252,width-1070,height-580,imgsize-29686,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2023-02-04T01:58:00Z',
    content:
      'Is Elon Musk a visionary or villain?Elon Musk is a household name across the globe, known for his various business ventures and technological advancements. As the founder, CEO and chief engineer of S… [+134 chars]',
  },
  {
    source: {
      id: null,
      name: 'Eurasiantimes.com',
    },
    author: 'EurAsian Times Desk',
    title:
      'Burning Like Hell! Ukraine Destroys Russia’s ‘Very Rare’ TOR-M2DT Defense System; Kyiv Taunts By Saying ‘Burned Brightly’ - EurAsian Times',
    description:
      'On February 3, the Ukrainian Defense Ministry released a video showing what appears to be a Russian Tor-M2DT anti-aircraft missile system getting destroyed by the Ukrainian military. In aerial footage shared by the ministry, the Russian surface-to-air missile…',
    url: 'https://eurasiantimes.com/burning-like-hell-ukraine-destroys-russias-very-rare-tor-m2d/',
    urlToImage:
      'https://eurasiantimes.com/wp-content/uploads/2023/02/TOR-BURNING-1.png',
    publishedAt: '2023-02-04T01:55:43Z',
    content:
      'On February 3, the Ukrainian Defense Ministry released a video showing what appears to be a Russian Tor-M2DT anti-aircraft missile system getting destroyed by the Ukrainian military.\r\nIn aerial foota… [+4923 chars]',
  },
  {
    source: {
      id: null,
      name: 'Hindustan Times',
    },
    author: 'HT Sports Desk',
    title:
      "'Umran Malik jaise bowlers toh hamaare Pakistan domestic mein bhare pade hain' - Hindustan Times",
    description:
      "Pakistan pacer Sohail Khan has come up with yet another bizarre take, this time on India pacer Umran Malik, saying that although the 23-year-old is a promising talent, 'bowlers like him' are very common in Pakistan's domestic cricket structure. | Cricket",
    url: 'https://www.hindustantimes.com/cricket/umran-malik-jaise-hamaare-domestic-cricket-mein-bhare-pade-hain-pakistan-pacer-targets-india-speedster-in-fiery-jibe-101675442145731.html',
    urlToImage:
      'https://images.hindustantimes.com/img/2023/02/03/1600x900/umran-getty_1675442411942_1675442424107_1675442424107.jpg',
    publishedAt: '2023-02-04T01:38:32Z',
    content:
      "India have produced a plethora of fast bowlers in the past but there's been none quite like Umran Malik. A tall, genuine tearaway pacer, who can regularly clock 150 kph on the speed gun is a rare odd… [+3151 chars]",
  },
  {
    source: {
      id: null,
      name: 'Hindustan Times',
    },
    author: 'PTI',
    title:
      'Cartels help Indians to illegally cross into US for $21,000: Report - Hindustan Times',
    description:
      'The minimum being charged by a cartel for a foreign national to illegally come into the United States, through Mexico, is USD 7,000 | World News',
    url: 'https://www.hindustantimes.com/world-news/cartels-help-indians-to-illegally-cross-into-us-for-21-000-report-101675472833100.html',
    urlToImage:
      'https://images.hindustantimes.com/img/2023/02/04/1600x900/A-Gujarati-man-died-on-December-14-after-he-fell-o_1671873037887_1675472885729_1675472885729.jpg',
    publishedAt: '2023-02-04T01:35:19Z',
    content:
      'Criminal transnational organisations called cartels on an average charge USD 21,000 from Indians to help them illegally cross over the American border, an Arizona Sheriff has told lawmakers here.\r\nTh… [+1100 chars]',
  },
  {
    source: {
      id: null,
      name: 'Business Insider India',
    },
    author: 'Morgan McFall-Johnsen',
    title:
      'The green comet and Mars will appear side-by-side next weekend. Spot them together in the sky. - Business Insider India',
    description:
      "A green comet and Mars will appear side-by-side in the night sky on February 10 and 11.It's a good opportunity to spot the comet in the early evening, maybe",
    url: 'https://www.businessinsider.in/science/news/the-green-comet-and-mars-will-appear-side-by-side-next-weekend-spot-them-together-in-the-sky-/articleshow/97592454.cms',
    urlToImage:
      'https://www.businessinsider.in/photo/97592454/the-green-comet-and-mars-will-appear-side-by-side-next-weekend-spot-them-together-in-the-sky-.jpg?imgsize=110056',
    publishedAt: '2023-02-04T00:57:00Z',
    content:
      'A green comet shooting past Earth for the first time since the Ice Age is about to skim right past Mars in the night sky.\r\nThe green comet and the red planet will be visible side-by-side across the N… [+1967 chars]',
  },
  {
    source: {
      id: null,
      name: 'YouTube',
    },
    author: null,
    title:
      'Samsung Unveils New Galaxy S23 Smartphone Lineup - Channels Television',
    description: null,
    url: 'https://www.youtube.com/supported_browsers?next_url=https:%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DzibqCJ4Dxlc',
    urlToImage: null,
    publishedAt: '2023-02-04T00:25:14Z',
    content:
      'Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later',
  },
  {
    source: {
      id: null,
      name: 'The Indian Express',
    },
    author: null,
    title:
      'Govt breaks its silence on Adani: SBI, LIC exposure within ‘limits’ - The Indian Express',
    description: null,
    url: 'https://indianexpress.com/article/business/companies/govt-breaks-its-silence-on-adani-sbi-lic-exposure-within-limits-8422976/',
    urlToImage: null,
    publishedAt: '2023-02-03T22:34:28Z',
    content: null,
  },
  {
    source: {
      id: null,
      name: 'CNET',
    },
    author: 'Monisha Ravisetti',
    title:
      "How Einstein's General Relativity Helped Scientists Analyze a Dead Star - CNET",
    description:
      "Gravitational microlensing has allowed astronomers to make the first-ever direct measurement of a white dwarf's mass.",
    url: 'https://www.cnet.com/science/space/how-einsteins-general-relativity-helped-scientists-analyze-a-dead-star/',
    urlToImage:
      'https://www.cnet.com/a/img/resize/fed9e63af2601287457b34ab6ae652b5bf1f2f78/hub/2023/02/02/e4af86ce-961c-4790-917a-8a88bbda3283/potw2045a.jpg?auto=webp&fit=crop&height=630&width=1200',
    publishedAt: '2023-02-03T21:16:00Z',
    content:
      "On Thursday, astronomers announced that they used NASA's Hubble Space Telescope to directly measure the mass of a star's corpse for the first time. But the kicker is that they did it by tapping into … [+5475 chars]",
  },
  {
    source: {
      id: 'the-times-of-india',
      name: 'The Times of India',
    },
    author: 'Samir Jain',
    title: 'Horoscope Today, February 4, 2023 - Indiatimes.com',
    description:
      'Horoscope(Old) News: Aries: Today blessing from the elders will give you confidence.',
    url: 'https://timesofindia.indiatimes.com/astrology/horoscope/horoscope-today-february-4-2023-read-your-daily-horoscope-predictions-here/articleshow/97489197.cms',
    urlToImage:
      'https://static.toiimg.com/thumb/msid-97489137,width-1070,height-580,imgsize-176254,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2023-02-03T18:30:00Z',
    content: null,
  },
  {
    source: {
      id: null,
      name: 'The Indian Express',
    },
    author: 'Ananthakrishnan G',
    title:
      'Delay in transfer of HC judges: ‘May result in administrative, judicial actions which may not be palatable’, SC warns Centre - The Indian Express',
    description:
      'The Supreme Court was hearing a plea seeking contempt of court proceedings against the government for the delay in clearing the names reiterated by the SC collegium within timelines laid down by the court.',
    url: 'https://indianexpress.com/article/india/delay-transfer-hc-judges-sc-warns-centre-8422397/',
    urlToImage:
      'https://images.indianexpress.com/2023/02/supreme-court-1-1.jpg',
    publishedAt: '2023-02-03T17:00:55Z',
    content:
      'The Supreme Court warned the government Friday that any further delay in taking a decision on the transfer of High Court judges recommended by the Collegium may result in both administrative and judi… [+4687 chars]',
  },
];

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

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
  const [loading, setLoading] = useState(false);
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
    // getData();
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
        <Header
          setProfileToggle={setProfileToggle}
          profileToggle={profileToggle}
        />
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
        {profileToggle ? (
          <Profile
            setProfileToggle={setProfileToggle}
            profileToggle={profileToggle}
          />
        ) : (
          ''
        )}
        <SideMenu />
      </View>
    );
  } else {
    return <Loading />;
  }
};

export default Home;
