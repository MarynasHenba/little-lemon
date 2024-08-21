import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/Logo.png')} />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
