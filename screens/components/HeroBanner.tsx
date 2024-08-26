import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../shared/styles/colors';
import {Searchbar} from 'react-native-paper';
import { HeroBannerProps } from '../types/home.types';

const HeroBanner = ({searchBarText, handleSearchChange}: HeroBannerProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Text style={styles.description}>
          We are family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/hero-image.png')}
        />
      </View>
      <Searchbar
        placeholder="Search"
        placeholderTextColor={colors.brown}
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor={colors.brown}
        inputStyle={{color: colors.brown}}
        elevation={0}
      />
    </View>
  );
};

export default HeroBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    padding: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 50,
    color: colors.yellow,
    marginBottom: -5,
  },
  subtitle: {
    fontSize: 28,
    color: colors.white,
  },
  description: {
    fontSize: 16,
    color: colors.white,
    flexShrink: 1,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: 30,
    marginTop: -10,
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: colors.white,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
