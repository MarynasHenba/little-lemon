import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getObjAsyncStorage} from '../../utils/asyncStorage';
import {colors} from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '../../../screens/Profile';

const LogoHeader = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [avatar, onAvatarChange] = useState('');
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const userData = await getObjAsyncStorage('user');
      console.log(userData);
      if (userData && userData.isOnboardingCompleted) {
        onChangeFirstName(userData.name);
        onChangeLastName(userData.lastName || '');
        onAvatarChange(userData.avatar || '');
        setIsOnboardingCompleted(userData.isOnboardingCompleted);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
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
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    flexGrow: 1,
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
