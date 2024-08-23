import {ScrollView, StyleSheet} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {colors} from '../shared/styles/colors';
import MenuList from './components/MenuList';
import HeroBanner from './components/HeroBanner';

export type MenuItemProps = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type HomeScreenProps = {
  menuItems: MenuItemProps[];
  filterSelections: boolean[];
  setFilterSelections: Dispatch<SetStateAction<boolean[]>>;
  searchBarText: string;
  handleSearchChange: (text: string) => void;
};

const HomeScreen = ({
  menuItems,
  filterSelections,
  setFilterSelections,
  searchBarText,
  handleSearchChange,
}: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <HeroBanner
        searchBarText={searchBarText}
        handleSearchChange={handleSearchChange}
      />
      <MenuList
        menuItems={menuItems}
        filterSelections={filterSelections}
        setFilterSelections={setFilterSelections}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrapper: {
    padding: 20,
    justifyContent: 'center',
  },
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.darkGreen,
    marginVertical: 15,
  },
  categoriesWrapper: {
    paddingBottom: 10,
    gap: 15,
  },
  categoriesContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  categoriesTab: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#999',
  },
  selected: {
    backgroundColor: colors.darkGreen,
  },
  selectedText: {
    color: colors.white,
  },
  text: {
    color: colors.brown,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
