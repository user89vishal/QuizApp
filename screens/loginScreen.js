import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

function loginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const alertTo = () => {
    Alert.alert(
      'Validation',
      'Username or Password is incorrect',
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

      const data = await AsyncStorage.getItem('userCredential');
      const user = JSON.stringify(data);
      console.log('user is: ', user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    console.log(username, ' : ', password);
    if (username === 'adminUser' && password === '12345678') {
      saveCredential();
      navigation.replace('Quiz');
    } else {
      alertTo();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../app/assets/quiz_icon.png')}
            />
            <Text>You Know You Grow</Text>
          </View>
          <View style={styles.loginForm}>
            <AppTextInput
              placeholder="username"
              onChangeText={(text) => setUsername(text)}
            />
            <AppTextInput
              placeholder="password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <AppButton title="Login" onPress={() => handleLogin()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    height: 100,
    margin: 10,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
