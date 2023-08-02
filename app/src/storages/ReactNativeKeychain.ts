import {resetGenericPassword, setGenericPassword, getGenericPassword} from 'react-native-keychain';

const key = 'k';

resetGenericPassword()
setGenericPassword(key, "hello")

export async function getFromReactNativeKeychain(): Promise<string | undefined> {
    const result = await getGenericPassword()
    if (result) return result.password;
    return undefined;
}
