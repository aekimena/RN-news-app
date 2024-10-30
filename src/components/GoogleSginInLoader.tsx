import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _styles from '../utils/_styles';
import colors from '../utils/colors';

export const GoogleSginInLoader = ({visible}: {visible: boolean}) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade">
      <View
        style={[
          _styles.allCenter,
          {flex: 1, backgroundColor: 'rgba(0,0, 0,0.3)', paddingHorizontal: 20},
        ]}>
        <View
          style={[
            _styles.allCenter,
            {height: 120, width: '100%', backgroundColor: '#fff'},
          ]}>
          <ActivityIndicator color={colors.primary} size={50} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
