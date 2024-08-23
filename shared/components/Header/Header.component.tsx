import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrowLeft from '../../../assets/images/arrow-left.svg';
import {colors} from '../../styles/colors';
import {getObjAsyncStorage} from '../../utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [avatar, onAvatarChange] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const value = await getObjAsyncStorage('user');
      if (value && value.isOnboardingCompleted) {
        onChangeFirstName(value.name);
        onChangeLastName(value.lastName || '');
        onAvatarChange(value.avatar || '');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeft stroke={'white'} />
      </Pressable>
      <Image source={require('../../../assets/images/Logo.png')} />
      {avatar ? (
        <Image style={styles.imagePlaceholder} source={{uri: avatar}} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageAbbr}>{`${firstName
            .substring(0, 1)
            .toUpperCase()}${
            lastName ? lastName.substring(0, 1).toUpperCase() : ''
          }`}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    backgroundColor: colors.darkGreen,
    borderRadius: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.darkGreen,
    borderRadius: 50,
  },
  imageAbbr: {
    fontSize: 30,
    color: colors.white,
  },
});
