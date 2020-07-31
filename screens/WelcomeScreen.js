import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../components/AppButton';

function WelcomeScreen({navigation}) {
  const [userLoggedIn, setUserLogeedIn] = useState(true);

  const isCustomerLoggedIn = async () => {
    try {
      const data = await AsyncStorage.getItem('userCredential');
      console.log('Data is :', data);

      if (data) {
        const user = JSON.parse(data);
        if (user.username === 'adminUser' && user.password === '12345678') {
          navigation.replace('Quiz');
        }
      } else {
        setUserLogeedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isCustomerLoggedIn();
  });

  return !userLoggedIn ? (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Start Quiz</Text>
        <AppButton title="Start" onPress={() => navigation.replace('Login')} />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.loadingQuestions}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Getting User detail</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    marginVertical: 10,
  },
  welcomeText: {
    position: 'absolute',
    top: 200,
    fontSize: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingQuestions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WelcomeScreen;
