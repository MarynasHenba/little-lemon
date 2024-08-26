import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {categories} from '../../App';
import {colors} from '../../shared/styles/colors';
import MenuItem from './MenuItem';
import {ItemSeparator} from '../../shared/components/Separator/Separator';
import {MenuItemProps} from '../types/home.types';

type MenuListProps = {
  menuItems: MenuItemProps[];
  filterSelections: boolean[];
  setFilterSelections: Dispatch<SetStateAction<boolean[]>>;
};

const MenuList = ({
  menuItems,
  filterSelections,
  setFilterSelections,
}: MenuListProps) => {
  const handleFiltersChange = async (index: number) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View style={styles.menuWrapper}>
      <View style={styles.categoriesWrapper}>
        <Text style={styles.menuTitle}>Order for delivery!</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={({item, index}) => (
            <Pressable
              style={[
                styles.categoriesTab,
                filterSelections[index] && styles.selected,
              ]}
              onPress={() => handleFiltersChange(index)}>
              <Text
                style={[
                  filterSelections[index] ? styles.selectedText : styles.text,
                ]}>
                {item}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={styles.categoriesContent}
        />
      </View>
      <ItemSeparator />
      <FlatList
        scrollEnabled={false}
        data={menuItems}
        renderItem={({item}) => <MenuItem {...item} />}
        keyExtractor={(item, index) => item.name + index.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  menuWrapper: {
    padding: 10,
    paddingVertical: 20,
    justifyContent: 'center',
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
