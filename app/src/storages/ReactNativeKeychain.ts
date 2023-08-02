import {getAllGenericPasswordServices, resetGenericPassword, setGenericPassword, getGenericPassword} from 'react-native-keychain';

const key = 'k';

getAllGenericPasswordServices().then(services => services.forEach((service) => resetGenericPassword({ service })))
setGenericPassword(key, "hello", {service: key})

export async function getFromKeychain(): Promise<string | undefined> {
    const result =await getGenericPassword({service: key})
    if (result) {
        return result.password;
    }
    return undefined;
}
