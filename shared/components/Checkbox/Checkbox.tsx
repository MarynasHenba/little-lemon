import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import CheckSvg from '../../../assets/images/check.svg';
import {colors} from '../../styles/colors';

type CheckboxProps = {
  isError?: boolean;
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress: () => void;
};

const Checkbox = ({
  onPress,
  status,
  disabled = false,
  isError,
}: CheckboxProps) => {
  const onPressCheckbox = () => {
    if (!disabled) {
      onPress();
    }
  };
  return (
    <Pressable onPress={onPressCheckbox} style={[styles.container]}>
      <View
        style={[
          styles.innerContainer,
          styles[status],
          disabled && styles.disabled,
          disabled && status === 'checked' && styles.disabledBackground,
          isError && styles.error,
        ]}>
        {status === 'checked' && (
          <CheckSvg stroke={disabled ? colors.sand : colors.darkGreen} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.darkGreen,
  },
  unchecked: {
    backgroundColor: 'transparent',
  },
  indeterminate: {},
  disabled: {
    borderColor: colors.darkGreen,
  },
  disabledBackground: {backgroundColor: colors.sand},
  error: {
    borderColor: 'red',
  },
});

export default Checkbox;
