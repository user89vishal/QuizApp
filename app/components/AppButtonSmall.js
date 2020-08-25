import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';

function AppButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF50',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
