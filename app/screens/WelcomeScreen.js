import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../config/colors';
import AppText from '../components/AppText';

function WelcomeScreen({navigation}) {
  const [userLoggedIn, setUserLogeedIn] = useState(true);

  const isCustomerLoggedIn = async () => {
    try {
      const userCredential = await AsyncStorage.getItem('userCredential');
      if (userCredential) {
        const user = JSON.parse(userCredential);
        if (user.username === 'adminUser' && user.password === '12345678') {
          navigation.replace('Quiz');
        }
      } else {
        setUserLogeedIn(false);
      }
    } catch (error) {
      alert('Error occured while fetching credential, Please login to proceed');
      setUserLogeedIn(false);
    }
  };

  useEffect(() => {
    isCustomerLoggedIn();
  });

  return !userLoggedIn ? (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <AppText fontSize={30}>Welcome</AppText>
        <AppText fontSize={15}>Start Quiz</AppText>
      </View>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={colors.lightGray}
        style={styles.startIcon}
        onPress={() => navigation.replace('Login')}>
        <Icon name="play" size={30} color="#fff" />
      </TouchableHighlight>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.loadingQuestions}>
      <ActivityIndicator size="large" color="#000" />
      <AppText fontSize={15}>Start Quiz</AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  startIcon: {
    paddingLeft: 5,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
  },
  loadingQuestions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WelcomeScreen;
