import React, {useState} from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppText from '../components/AppText';

function LoginScreen({navigation}) {
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

  const handleLogin = async () => {
    if (username === 'adminUser' && password === '12345678') {
      try {
        await AsyncStorage.setItem(
          'userCredential',
          JSON.stringify({username: username, password: password}),
        );
        navigation.replace('Quiz');
      } catch (error) {
        saveCredentialFailAlert();
      }
    } else {
      validationFailAlert();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Image source={require('../assets/quiz_icon.png')} style={styles.logo} />
      <AppText fontSize={20}>You Know You Grow</AppText>

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

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    top: -120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
