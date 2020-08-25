import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import colors from '../config/colors';

function AppTextInput({onChangeText, ...otherProps}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        {...otherProps}
        autoCapitalize="none"
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    padding: Platform.OS === 'android' ? 0 : 10,
    margin: 5,
    width: '100%',
  },
  textInput: {
    fontSize: 18,
    fontFamily: Platform.os === 'android' ? 'Roboto' : 'Avenir',
  },
});

export default AppTextInput;
