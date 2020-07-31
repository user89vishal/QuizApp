import 'react-native-gesture-handler';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './screens/loginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Quiz from './screens/Quiz';

const Stack = createStackNavigator();

function LogoTitle() {
  return <Text style={styles.text}>Quiz</Text>;
}

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Quiz" component={Quiz} />
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
