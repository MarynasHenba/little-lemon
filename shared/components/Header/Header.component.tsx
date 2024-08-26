import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrowLeft from '../../../assets/images/arrow-left.svg';
import {colors} from '../../styles/colors';
import {getObjAsyncStorage} from '../../utils/asyncStorage';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProfileScreenNavigationProp} from '../../../screens/types/profile.types';

const Header = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [avatar, onAvatarChange] = useState('');
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const value = await getObjAsyncStorage('user');
      if (value && value.isOnboardingCompleted) {
        onChangeFirstName(value.name);
        onChangeLastName(value.lastName || '');
        onAvatarChange(value.avatar || '');
        setIsOnboardingCompleted(value.isOnboardingCompleted);
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, !navigation.canGoBack() && styles.wrapper]}>
      {navigation.canGoBack() && (
        <Pressable
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeft stroke={'white'} />
        </Pressable>
      )}
      <Image
        style={[!navigation.canGoBack() && styles.logo]}
        source={require('../../../assets/images/Logo.png')}
      />
      {isOnboardingCompleted && (
        <Pressable
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          {avatar ? (
            <Image style={styles.imagePlaceholder} source={{uri: avatar}} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageAbbr}>{`${firstName
                ?.substring(0, 1)
                .toUpperCase()}${
                lastName ? lastName.substring(0, 1).toUpperCase() : ''
              }`}</Text>
            </View>
          )}
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    marginVertical: 0,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  logo: {
    flexGrow: 1,
    resizeMode: 'contain',
  },
});
