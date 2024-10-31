import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _styles from '../utils/_styles';
import staticData from '../utils/staticData';
import colors from '../utils/colors';
import {useSafeTops} from '../hooks/useSafeTops';
import {useDispatch} from 'react-redux';
import {logUserAction} from '../reduxUtils/services/analyticsActions';

export const CategoryButtons = ({
  activeCategory,
  onCategoryPress,
  disabled,
}: {
  activeCategory: number;
  onCategoryPress: (val: number) => void;
  disabled: boolean;
}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: useSafeTops(30),
        },
      ]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[_styles.flexRow, {gap: 10, paddingHorizontal: 20}]}>
          {staticData.categoryList.map((item, index) => (
            <Pressable
              onPress={() => {
                onCategoryPress(index);
                dispatch(
                  logUserAction('category_button_press', {
                    category: item.title,
                  }),
                );
              }}
              disabled={disabled}
              key={index}
              style={[
                _styles.allCenter,
                styles.button,
                {
                  backgroundColor:
                    activeCategory == index ? colors.primary : colors.greyLight,
                },
              ]}>
              <Text
                style={[
                  _styles.font14Medium,
                  {color: activeCategory == index ? '#fff' : '#777'},
                ]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 15,

    zIndex: 20,
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
});
