import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './app/screens/LoginScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Quiz from './app/screens/Quiz';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        title: 'Quiz App',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: 'Quiz App',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        title: 'Quiz App',
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
