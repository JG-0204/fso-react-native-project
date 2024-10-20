import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:token`);

      return token ? JSON.parse(token) : null;
    } catch (e) {
      console.log(e.message);
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:token`,
        JSON.stringify(accessToken)
      );
    } catch (e) {
      console.log(e.message);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default AuthStorage;
