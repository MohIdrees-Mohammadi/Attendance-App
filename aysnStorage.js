// AsyncStorageHelper.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserDataToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error.message);
  }
};

export const getDataFromStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from AsyncStorage:", error.message);
    return null;
  }
};

export const clearDataFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing data from AsyncStorage:", error.message);
  }
};
