import {getItemAsync, setItemAsync, deleteItemAsync} from 'expo-secure-store';

const key = 'k';

deleteItemAsync(key)
setItemAsync(key, "hello")

export async function getFromExpoSecureStorage(): Promise<string | null> {
    return getItemAsync(key)
}
