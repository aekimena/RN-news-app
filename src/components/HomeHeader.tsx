import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _styles from '../utils/_styles';
import colors from '../utils/colors';
import {useSafeTops} from '../hooks/useSafeTops';
import crashlytics, {log} from '@react-native-firebase/crashlytics';

export const HomeHeader = () => {
  return (
    <View style={{paddingHorizontal: 20, paddingTop: useSafeTops(50), gap: 5}}>
      <View style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
        <Pressable
          style={styles.errBtn}
          onPress={() => {
            crashlytics().crash();
          }}>
          <Text style={[_styles.font14Regular, {color: '#fff'}]}>
            Trigger Error
          </Text>
        </Pressable>
      </View>

      <Text style={[_styles.font24Bold, {color: colors.black}]}>FP News</Text>
      <Text
        style={[_styles.font14Regular, {color: colors.black, fontSize: 13.5}]}>
        Discover news from around the world
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 50,
    backgroundColor: '#ff0000',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
