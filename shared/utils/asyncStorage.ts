import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (
  key: string,
  value: string,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error, `can't set ${key} : ${value} in async storage`);
    return false;
  }
};

export const setObjAsyncStorage = async (
  key: string,
  value: {[key: string]: any},
): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.log(error, `can't set ${key} : ${value} in async storage`);
    return false;
  }
};

export const getAsyncStorage = async (
  key: string,
): Promise<string | undefined> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
  } catch (error) {
    console.log(error, `can't get data for "${key}" in async storage`);
    return undefined;
  }
};

export const getObjAsyncStorage = async (
  key: string,
): Promise<{[key: string]: any} | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  } catch (error) {
    console.log(error, `can't get data for "${key}" in async storage`);
    return undefined;
  }
};

export const deleteAsyncStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error, `can't delete data for "${key}" in async storage`);
    return false;
  }
};
