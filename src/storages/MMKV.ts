import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
const key = 'k';
storage.set(key, 'hello');

export function getFromMMKV(): string | undefined {
  return storage.getString(key);
}
