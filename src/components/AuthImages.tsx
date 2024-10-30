import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeTops} from '../hooks/useSafeTops';

export const AuthImages = ({source}: {source: any}) => {
  return (
    <Image
      source={source}
      style={[
        styles.image,
        {
          marginTop: useSafeTops(100),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
});
