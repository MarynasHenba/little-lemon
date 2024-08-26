import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import CheckSvg from '../../../assets/images/check.svg';
import {colors} from '../../styles/colors';

type CheckboxProps = {
  isError?: boolean;
  title?: string;
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress: () => void;
};

const Checkbox = ({
  onPress,
  status,
  disabled = false,
  isError,
  title,
}: CheckboxProps) => {
  const onPressCheckbox = () => {
    if (!disabled) {
      onPress();
    }
  };
  return (
    <View>
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
        {title && <Text>{title}</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
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
