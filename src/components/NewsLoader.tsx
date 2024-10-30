import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import _styles from '../utils/_styles';

export const NewsLoader = () => {
  return (
    <View style={[_styles.flexRow, styles.itemCont]}>
      <View style={styles.imageSkeleton} />
      <View style={styles.textArea}>
        <View
          style={[
            styles.commonStyles,
            {
              width: 130,
            },
          ]}
        />
        <View style={{gap: 10}}>
          <View
            style={[
              styles.commonStyles,
              {
                width: '100%',
              },
            ]}
          />
          <View
            style={[
              styles.commonStyles,
              {
                width: 120,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.commonStyles,
            {
              width: 100,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCont: {
    gap: 15,
    height: 140,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  commonStyles: {
    backgroundColor: colors.greyLight,
    borderRadius: 50,
    height: 15,
  },
  imageSkeleton: {
    height: 120,
    width: 120,
    borderRadius: 10,
    backgroundColor: colors.greyLight,
  },
  textArea: {
    justifyContent: 'space-between',
    flex: 1,
    height: 100,
  },
});
