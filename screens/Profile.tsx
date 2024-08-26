import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonView from '../shared/components/Button/Button.component';
import {
  getObjAsyncStorage,
  setObjAsyncStorage,
} from '../shared/utils/asyncStorage';
import FormInput from '../shared/components/FormInput/FormInput.component';
import Checkbox from '../shared/components/Checkbox/Checkbox';
import {colors} from '../shared/styles/colors';

type ProfileScreenProps = {
  setIsOnboardingCompleted: Dispatch<SetStateAction<boolean>>;
};

import {NotificationItem, Notifications, Options} from './types/profile.types';

const notificationsData: NotificationItem[] = [
  {title: 'Order statuses', propertyName: 'orderStatuses'},
  {title: 'Password changes', propertyName: 'passwordChanges'},
  {title: 'Special offers', propertyName: 'specialOffers'},
  {title: 'Newsletter', propertyName: 'newsletter'},
];

const ProfileScreen = ({setIsOnboardingCompleted}: ProfileScreenProps) => {
  const [avatar, onChangeAvatar] = useState('');
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [phone, onChangePhone] = useState('');
  const [email, onChangeEmail] = useState('');
  const [notifications, setNotifications] = useState<Notifications>({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const resetValues = async () => {
    const value = await getObjAsyncStorage('user');
    if (value && value.isOnboardingCompleted) {
      onChangeFirstName(value.name);
      onChangeEmail(value.email);
      onChangeLastName(value.lastName || '');
      onChangePhone(value.phone || '');
      onChangeAvatar(value.avatar || '');
      setNotifications({
        orderStatuses: value?.notifications?.orderStatuses || false,
        passwordChanges: value?.notifications?.passwordChanges || false,
        specialOffers: value?.notifications?.specialOffers || false,
        newsletter: value?.notifications?.newsletter || false,
      });
    }
  };

  useEffect(() => {
    resetValues();
  }, []);

  const saveChanges = async () => {
    const userData = await getObjAsyncStorage('user');
    await setObjAsyncStorage('user', {
      ...userData,
      name: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      avatar: avatar,
      notifications: notifications,
    });
  };

  const removeAvatar = async () => {
    const userData = await getObjAsyncStorage('user');
    await setObjAsyncStorage('user', {...userData, avatar: ''});
    onChangeAvatar('');
  };

  const toggleNotifications = (option: Options) => {
    setNotifications({
      ...notifications,
      [option]: !notifications[option],
    });
  };

  const renderNotifications = ({item}: {item: NotificationItem}) => (
    <Checkbox
      {...item}
      status={notifications[item.propertyName] ? 'checked' : 'unchecked'}
      onPress={() => toggleNotifications(item.propertyName)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Personal information</Text>
        <View style={[styles.section, styles.avatarSection]}>
          <View>
            <Text style={styles.label}>Avatar</Text>
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
          <View style={styles.buttonsWrapperAvatarSection}>
            <ButtonView
              title="Change"
              color="darkGreen"
              onPress={() => {
                launchImageLibrary({mediaType: 'photo'}, ({assets}) => {
                  if (assets) {
                    onChangeAvatar(assets[0].uri || '');
                  }
                });
              }}
            />
            <ButtonView
              title="Remove"
              color="transparent"
              onPress={removeAvatar}
            />
          </View>
        </View>
        <FormInput
          value={firstName}
          setValue={onChangeFirstName}
          placeholder="Type your first name"
          keyboardType="decimal-pad"
          label="First name"
        />
        <FormInput
          value={lastName}
          setValue={onChangeLastName}
          placeholder="Type your last name"
          keyboardType="decimal-pad"
          label="Last name"
        />
        <FormInput
          value={email}
          setValue={onChangeEmail}
          placeholder="Type your email"
          keyboardType="decimal-pad"
          label="Email"
        />
        <FormInput
          mask="(999) 999-9999"
          placeholder="(215) 555-0133"
          value={phone}
          setValue={onChangePhone}
          keyboardType="numeric"
          label="Phone number"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Email notifications</Text>
        <FlatList
          scrollEnabled={false}
          data={notificationsData}
          renderItem={renderNotifications}
          keyExtractor={(item, index) => index.toString() + item.propertyName}
        />
      </View>
      <View style={styles.section}>
        <ButtonView
          title="Log out"
          isDisabled={false}
          onPress={async () => {
            await setObjAsyncStorage('user', {});
            setIsOnboardingCompleted(false);
          }}
          color="yellow"
        />
        <View style={styles.buttonsWrapper}>
          <ButtonView
            title="Discard changes"
            onPress={resetValues}
            color="transparent"
          />
          <ButtonView
            title="Save changes"
            onPress={saveChanges}
            color="darkGreen"
          />
        </View>
      </View>
      <View style={styles.bottomGap} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 20,
  },
  section: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#EDEFEE',
  },
  subtitle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.darkGreen,
    borderRadius: 50,
  },
  imageAbbr: {
    fontSize: 30,
    color: colors.white,
  },
  label: {
    color: 'black',
    fontSize: 11,
    marginBottom: 5,
  },
  avatarSection: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  buttonsWrapperAvatarSection: {
    marginTop: 15,
    marginLeft: 20,
    columnGap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomGap: {
    height: 50,
  },
});
