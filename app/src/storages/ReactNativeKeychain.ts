import {getAllGenericPasswordServices, resetGenericPassword, setGenericPassword, getGenericPassword} from 'react-native-keychain';

const key = 'k';

getAllGenericPasswordServices().then(services => services.forEach((service) => resetGenericPassword({ service })))
setGenericPassword(key, "hello")

export async function getFromReactNativeKeychain(): Promise<string | undefined> {
    const result = await getGenericPassword()
    if (result) return result.password;
    return undefined;
}
