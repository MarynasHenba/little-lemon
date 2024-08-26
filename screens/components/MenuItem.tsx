import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../shared/styles/colors';
import {MenuItemProps} from '../types/home.types';

const MenuItem = ({name, description, image, price}: MenuItemProps) => {
  const images = {
    'Grilled Fish': require('../../assets/images/GrilledFish.png'),
    'Lemon Dessert': require('../../assets/images/LemonDessert.png'),
    default: require('../../assets/images/LittleLemonLogo.png'),
  };

  const [error, setError] = useState(false);
  const placeholderImage = images[name] || images.default;
  const imageUri = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`;

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Image
        style={[styles.image, error && styles.errorImg]}
        source={error || !imageUri ? placeholderImage : {uri: imageUri}}
        onError={() => setError(true)}
      />
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    color: colors.brown,
    fontSize: 20,
  },
  image: {
    minWidth: 90,
    height: 90,
    resizeMode: 'cover',
  },
  errorImg: {
    width: 90,
    resizeMode: 'cover',
  },
  description: {},
  textWrapper: {
    maxWidth: '70%',
    rowGap: 10,
  },
  price: {
    color: colors.brown,
    fontWeight: 'bold',
  },
});
