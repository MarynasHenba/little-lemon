import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonView from '../shared/components/Button/Button.component';
import FormInput from '../shared/components/FormInput/FormInput.component';
import LogoHeader from '../shared/components/LogoHeader/LogoHeader.component';
import {setObjAsyncStorage} from '../shared/utils/asyncStorage';
import {validateEmail} from '../shared/utils/validateEmail';

type OnboardingScreenProps = {
  setIsOnboardingCompleted: Dispatch<SetStateAction<boolean>>;
};

const OnboardingScreen = ({
  setIsOnboardingCompleted,
}: OnboardingScreenProps) => {
  const [firstName, onChangeFirstName] = useState('');
  const [email, onChangeEmail] = useState('');

  return (
    <View style={styles.container}>
      <LogoHeader />
      <View>
        <FormInput
          value={firstName}
          setValue={onChangeFirstName}
          placeholder="Type your name"
          keyboardType="decimal-pad"
        />
        <FormInput
          value={email}
          setValue={onChangeEmail}
          placeholder="Type your email"
          keyboardType="email-address"
        />
      </View>
      <ButtonView
        title="Next"
        isDisabled={!firstName || !(email && validateEmail(email))}
        onPress={async () => {
          await setObjAsyncStorage('user', {
            isOnboardingCompleted: 'true',
            name: firstName,
            email: email,
          });
          setIsOnboardingCompleted(true);
        }}
        color="yellow"
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
