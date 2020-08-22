import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

function loginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validationFailAlert = () => {
    Alert.alert(
      'Validation',
      'Username or Password is incorrect',
      [{text: 'OK', onPress: () => Alert.dismiss}],
      {cancelable: false},
    );
  };

  const saveCredentialFailAlert = () => {
    Alert.alert(
      'Internal Error',
      'Please login again for persistency',
      [{text: 'OK', onPress: () => Alert.dismiss}],
      {cancelable: false},
    );
  };

  const saveCredential = async () => {
    try {
      await AsyncStorage.setItem(
        'userCredential',
        JSON.stringify({username: username, password: password}),
      );
      const data = JSON.parse(await AsyncStorage.getItem('userCredential'));
      return data;
    } catch (error) {
      saveCredentialFailAlert();
      return {error: 'error'};
    }
  };

  const handleLogin = () => {
    if (username === 'adminUser' && password === '12345678') {
      (async () => {
        let {username} = await saveCredential();
        if (username) {
          navigation.replace('Quiz');
        }
      })();
    } else {
      validationFailAlert();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require('../app/assets/quiz_icon.png')}
        style={styles.logo}
      />
      <Text>You Know You Grow</Text>

      <AppTextInput
        placeholder="username"
        onChangeText={(text) => setUsername(text)}
      />
      <AppTextInput
        placeholder="password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <AppButton title="Login" onPress={handleLogin} />
    </KeyboardAvoidingView>
  );
}

export default loginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f8f4f4',
  },
  loginForm: {
    width: '100%',
    position: 'absolute',
    top: 300,
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 100,
    margin: 10,
    height: 100,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
