import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _styles from '../utils/_styles';
import colors from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logUserAction} from '../reduxUtils/services/analyticsActions';
import {getDate} from '../functions/getDate';

export const RenderNewsItem = ({
  item,
  category,
}: {
  item: NewsItemProps;
  category: string;
}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Details', {passedData: item, category});
        dispatch(logUserAction('news_item_press', {newsTitle: item.title}));
      }}
      style={({pressed}) => [
        _styles.flexRow,
        styles.container,
        {
          backgroundColor: pressed ? colors.pressed : 'transparent',
        },
      ]}>
      <View style={{height: 120, width: 120}}>
        <Image
          style={{height: 120, width: 120, borderRadius: 10}}
          source={{uri: item.thumbnail_url || item.photo_url}}
        />
        <View style={styles.imageLayer} />
      </View>

      <View style={{justifyContent: 'space-between', flex: 1, height: 120}}>
        <Text
          style={[_styles.font14Medium, {color: colors.greyDark}]}
          numberOfLines={1}>
          {item.source_name}
        </Text>
        <Text
          numberOfLines={2}
          style={[_styles.font16Bold, {color: colors.black, lineHeight: 24}]}>
          {item.title}
        </Text>
        <View style={[_styles.flexRow, {gap: 10}]}>
          <Image
            source={{uri: item.source_logo_url}}
            style={styles.sourceImg}
          />
          <View style={styles.dot} />
          <Text
            style={[_styles.font12Medium, {color: colors.greyDark}]}
            numberOfLines={1}>
            {getDate(item.published_datetime_utc)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    height: 140,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sourceImg: {
    height: 15,
    width: 15,
    borderRadius: 30,
    resizeMode: 'contain',
  },

  dot: {
    height: 4,
    width: 4,
    borderRadius: 4,
    backgroundColor: colors.greyDark,
  },
  imageLayer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 10,
  },
});
