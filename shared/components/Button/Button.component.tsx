import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '../../styles/colors';

interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  onPress: () => void;
  color: 'transparent' | 'darkGreen' | 'yellow';
}

const ButtonView = ({
  title,
  isDisabled,
  onPress,
  color = 'darkGreen',
}: ButtonProps) => {
  const upperCaseColorStyle:
    | 'buttonTextYellow'
    | 'buttonTextDarkGreen'
    | 'buttonTransparent' = `buttonText${color
    .substring(0, 1)
    .toUpperCase()}${color.substring(1)}`;

  return (
    <Pressable
      style={[styles.button, isDisabled && styles.disabled, styles[color]]}
      onPress={onPress}
      disabled={isDisabled}>
      <Text style={[styles.buttonText, styles[upperCaseColorStyle]]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ButtonView;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.brown,
  },
  buttonTextYellow: {
    color: colors.brown,
  },
  buttonTextDarkGreen: {
    color: colors.white,
  },
  buttonTransparent: {
    color: colors.darkGreen,
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  darkGreen: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
    color: colors.white,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderColor: colors.darkGreen,
  },
  yellow: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
});
