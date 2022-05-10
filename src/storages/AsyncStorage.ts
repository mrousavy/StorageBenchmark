import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'k';

AsyncStorage.clear();
AsyncStorage.setItem(key, 'hello');

export async function getFromAsyncStorage(): Promise<string | null> {
  return AsyncStorage.getItem(key);
}
