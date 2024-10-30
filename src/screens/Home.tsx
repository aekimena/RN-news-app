import {Image, SectionList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import _styles from '../utils/_styles';
import colors from '../utils/colors';
import {useGetCategoryNews} from '../apiHooks/useGetCategoryNews';
import staticData from '../utils/staticData';
import {HomeHeader} from '../components/HomeHeader';
import {CategoryButtons} from '../components/CategoryButtons';
import {RenderNewsItem} from '../components/RenderNewsItem';
import {navigateScreen} from '../reduxUtils/services/analyticsActions';
import {MainContainer} from '../components/MainContainer';
import {NewsLoader} from '../components/NewsLoader';
import images from '../utils/images';
import crashlytics from '@react-native-firebase/crashlytics';

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [newsData, setNewsData] = useState([]);

  // get news api hook
  const {
    getCategoryNews,
    loading: categoryLoading,
    isError,
  } = useGetCategoryNews();

  const dispatch = useDispatch();

  // function to call when a category button is pressed.

  const onCategoryPress = (index: number) => {
    crashlytics().log('News api fetch request on category press'); // update crashlytics
    setActiveCategory(index);
    getCategoryNews({topic: staticData.categoryList[index].query})
      .then(res => {
        setNewsData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
        crashlytics().recordError(err);
      });
  };

  // sections is used to render sticky header

  const sections = [
    {
      title: 'First Header',
      data: [], // first section has no data, just header
      renderHeader: () => <HomeHeader />,
    },
    {
      title: 'Second Header',
      data: categoryLoading ? [1, 2, 3, 4, 5] : newsData, // dummy data if loading else news data
      renderHeader: () => (
        <CategoryButtons
          onCategoryPress={onCategoryPress}
          activeCategory={activeCategory}
        />
      ),
    },
  ];

  useEffect(() => {
    crashlytics().log('News api fetch request on mount.'); // update crashlytics

    // get news list on mount
    getCategoryNews({topic: staticData.categoryList[activeCategory].query})
      .then(res => {
        setNewsData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
        crashlytics().recordError(err);
      });

    // Log when screen is viewed

    dispatch(navigateScreen('Home')); // screen update to analytics
  }, []);

  return (
    <MainContainer backgroundColor="#fff" barStyle="dark-content">
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <SectionList
            sections={sections}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) =>
              !isError && categoryLoading ? (
                <NewsLoader />
              ) : !isError && !categoryLoading ? (
                <RenderNewsItem
                  item={item}
                  category={staticData.categoryList[activeCategory].title}
                />
              ) : (
                <View />
              )
            }
            renderSectionHeader={({section}) => section.renderHeader()} // Using the component for the header
            stickySectionHeadersEnabled={true}
          />
        </View>

        {isError && !categoryLoading && (
          <View style={styles.errorOverlay}>
            <View style={{alignItems: 'center', gap: 10, marginTop: 30}}>
              <Image source={images.error} style={{height: 130, width: 130}} />
              <Text style={[_styles.font12Regular, {color: colors.black}]}>
                Something went wrong!
              </Text>
            </View>
          </View>
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
