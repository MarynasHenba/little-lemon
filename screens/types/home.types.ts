import { Dispatch, SetStateAction } from 'react';

export type MenuItemProps = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type HomeScreenProps = {
  menuItems: MenuItemProps[];
  filterSelections: boolean[];
  setFilterSelections: Dispatch<SetStateAction<boolean[]>>;
  searchBarText: string;
  handleSearchChange: (text: string) => void;
};

export type HeroBannerProps = {
  searchBarText: string;
  handleSearchChange: (text: string) => void;
};