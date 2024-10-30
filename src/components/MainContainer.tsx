import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const MainContainer = ({
  children,
  backgroundColor,
  barStyle,
}: {
  children: JSX.Element;
  backgroundColor: string;
  barStyle?: 'dark-content' | 'light-content';
}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        animated
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});
