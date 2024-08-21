import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {MaskedTextInput} from 'react-native-mask-text';

interface InputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  mask?: string;
}

const FormInput = ({
  value,
  setValue,
  placeholder,
  keyboardType,
  label,
  mask,
}: InputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      {mask ? (
        <MaskedTextInput
          mask={mask}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType ? keyboardType : 'email-address'} // change to default
          style={styles.inputBox}
        />
      ) : (
        <TextInput
          aria-label="Input"
          style={styles.inputBox}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          keyboardType={keyboardType ? keyboardType : 'email-address'}
        />
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 11,
    marginBottom: -5,
  },
  inputBox: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#EDEFEE',
  },
});
