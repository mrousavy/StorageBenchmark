import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: 'encrypted-mmkv-storage',
  encryptionKey: 'hunter2',
});

storage.clearAll();

const key = 'k';
storage.set(key, 'hello');

export function getFromMMKVEncrypted(): string | undefined {
  return storage.getString(key);
}
