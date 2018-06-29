import { AsyncStorage } from 'react-native';

export enum AppStorageType {
  USER_INFO = 'UserInfo'
}

export const getStorageItem = async (storageId: AppStorageType, key: string) => {
  try {
    return await AsyncStorage.getItem(`@${storageId}:${key}`);
  } catch (e) {
    console.error(e);
  }
  return;
};

export const saveStorageItem = async (storageId: AppStorageType, key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${storageId}:${key}`, value);
  } catch (e) {
    console.error(e);
  }
};
