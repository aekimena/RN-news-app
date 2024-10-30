import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import _styles from '../utils/_styles';

export const CustomInputs = ({
  placeholder,
  onChangeText,
  rightView,
  error,
  errorMessage,
}: {
  placeholder: string;
  onChangeText: (val: string) => void;
  rightView?: JSX.Element | null;
  error?: boolean;
  errorMessage?: string;
}) => {
  return (
    <View>
      <View style={styles.inputCont}>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#777'}
          style={[
            _styles.font14Regular,
            {height: '100%', flex: 1, color: '#555'},
          ]}
        />
        {rightView && rightView}
      </View>
      {error && (
        <Text style={[_styles.font12Regular, {color: '#ff0000'}]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputCont: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.greyLight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 15,
  },
});
