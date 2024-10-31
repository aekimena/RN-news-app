import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import {useSafeTops} from '../hooks/useSafeTops';
import _styles from '../utils/_styles';
import {useDispatch} from 'react-redux';
import {
  logUserAction,
  navigateScreen,
} from '../reduxUtils/services/analyticsActions';
import {getDate} from '../functions/getDate';
import {MainContainer} from '../components/MainContainer';
import {getTimeDifferenceInMinutes} from '../functions/getTimeDiff';
import images from '../utils/images';

const {height} = Dimensions.get('window');

export const NewsDetails = ({route, navigation}) => {
  const [startTime, setStartTime] = useState<Date>(new Date()); // screen start time on mount
  const dispatch = useDispatch();
  const passedData: NewsItemProps = route.params.passedData; // news item
  const {category} = route.params; // passed category from previous screen

  useEffect(() => {
    dispatch(navigateScreen('NewsDetails'));
    return () => {
      // update the aount of time user spent on this news to analytics
      dispatch(
        logUserAction('newsDetails_screen_time_summary', {
          screenTimeInMinutes: getTimeDifferenceInMinutes(
            startTime.toISOString(),
            new Date().toISOString(),
          ),
          newsTitie: passedData?.title,
        }),
      );
    };
  }, []);
  return (
    <MainContainer barStyle="light-content" backgroundColor="transparent">
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <View style={{height: height * 0.5, width: '100%'}}>
            <ImageBackground
              style={{height: height * 0.5, width: '100%'}}
              source={{
                uri: passedData?.thumbnail_url || passedData?.photo_url,
              }}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{marginTop: useSafeTops(50), left: 20, zIndex: 5}}>
                <Image
                  source={images.backIconWhite}
                  style={{height: 20, width: 20}}
                />
              </Pressable>
              <View style={styles.layer} />
              <View style={styles.bottomAbsView}>
                <View style={[_styles.allCenter, styles.category]}>
                  <Text style={[_styles.font14Regular, {color: '#fff'}]}>
                    {category}
                  </Text>
                </View>
                <Text style={[_styles.font24Medium, {color: '#fff'}]} numberOfLines={4}>
                  {passedData.title}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={[_styles.flexRow, styles.authorSec]}>
            <View style={{flex: 1, gap: 7}}>
              <Text style={[_styles.font14Medium, {color: colors.black}]}>
                {passedData?.source_name}
              </Text>
              <Text
                style={[
                  _styles.font12Medium,
                  {color: colors.greyDark, fontSize: 10},
                ]}>
                {getDate(passedData?.published_datetime_utc)}
              </Text>
            </View>
            <Image
              style={styles.sourceImg}
              source={{uri: passedData?.source_logo_url}}
            />
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 15}}>
            <Text
              style={[_styles.font14Regular, {color: '#222', lineHeight: 24}]}>
              {passedData?.snippet}
            </Text>
          </View>
        </ScrollView>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  layer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomAbsView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
  category: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
  },
  authorSec: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.3,
    borderColor: colors.greyLight,
  },
  headerSec: {
    height: 100,
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255,255,255, 0)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sourceImg: {
    height: 40,
    width: 40,
    borderRadius: 40,
    resizeMode: 'contain',
  },
});
