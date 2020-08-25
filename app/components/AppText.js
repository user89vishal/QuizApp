import React from 'react';
import {Text} from 'react-native';

function AppText({children, fontSize}) {
  return (
    <Text
      style={{
        fontSize: fontSize,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        marginVertical: 10,
      }}>
      {children}
    </Text>
  );
}

export default AppText;
