import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import {getObjAsyncStorage} from './shared/utils/asyncStorage';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/Splash';
import Header from './shared/components/Header/Header.component';
import HomeScreen, {MenuItemProps} from './screens/Home';
import LogoHeader from './shared/components/LogoHeader/LogoHeader.component';
import {
  getDBConnection,
  createTable,
  getMenuItems,
  saveItems,
  filterByQueryAndCategories,
} from './shared/database/db-service';
import {fetchMenuItems} from './shared/services/menu-items';
import {useUpdateEffect} from './shared/utils/useUpdateEffect';
import {useDebounce} from './shared/hooks/useDebounce';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Onboarding: undefined;
};

export const categories = [
  'Starters',
  'Mains',
  'Drinks',
  'Desserts',
  'Specials',
];

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    categories.map(() => false),
  );
  const debounceQuery = useDebounce(searchBarText);

  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
  };

  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
  };

  useEffect(() => {
    (async () => {
      const value = await getObjAsyncStorage('user');
      if (value && value.isOnboardingCompleted) {
        completeOnboarding();
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      await createTable(db);

      const storedMenuItems = await getMenuItems(db);
      if (!storedMenuItems.length) {
        const fetchedMenuItems = await fetchMenuItems();
        setMenuItems(fetchedMenuItems);
        await saveItems(db, fetchedMenuItems);
      } else {
        setMenuItems(storedMenuItems);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const db = await getDBConnection();
      const activeCategories = categories.filter((s, i) => {
        if (filterSelections.every((item: boolean) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const filteredMenuItems = await filterByQueryAndCategories(
          db,
          activeCategories,
          debounceQuery,
        );

        setMenuItems(filteredMenuItems);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, [filterSelections, debounceQuery]);

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
            <>
              <Stack.Screen
                name="Home"
                children={props => (
                  <HomeScreen
                    {...props}
                    menuItems={menuItems}
                    filterSelections={filterSelections}
                    setFilterSelections={setFilterSelections}
                    searchBarText={searchBarText}
                    handleSearchChange={handleSearchChange}
                  />
                )}
                options={{header: LogoHeader}}
              />
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
            </>
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
