import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../styles/colors';

export const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.darkGreen,
    marginVertical: 15,
  },
});
