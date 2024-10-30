import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import _styles from '../utils/_styles';

export const CustomButton = ({
  title,
  leftView,
  backgroundColor,
  color,
  onPress,
  disabled,
}: {
  title: string;
  leftView?: JSX.Element | null;
  backgroundColor: string;
  color: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor,

          opacity: disabled ? 0.7 : 1,
        },
      ]}>
      <View style={{position: 'absolute', left: 15}}>
        {leftView && leftView}
      </View>

      <Text
        style={[
          _styles.font14Medium,
          {flex: 1, textAlign: 'center', color, fontSize: 16},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 15,
  },
});
