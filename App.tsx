import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import {getObjAsyncStorage} from './shared/utils/asyncStorage';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/Splash';
import Header from './shared/components/Header/Header.component';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
  };

  useEffect(() => {
    (async () => {
      const value = await getObjAsyncStorage('user');
      if (value && value.isOnboardingCompleted === 'true') {
        completeOnboarding();
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isOnboardingCompleted ? (
            <Stack.Screen
              name="Onboarding"
              children={props => (
                <OnboardingScreen
                  {...props}
                  setIsOnboardingCompleted={setIsOnboardingCompleted}
                />
              )}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Profile"
              children={props => (
                <ProfileScreen
                  {...props}
                  setIsOnboardingCompleted={setIsOnboardingCompleted}
                />
              )}
              options={{header: Header}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
