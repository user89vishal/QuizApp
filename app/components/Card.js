import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

function Card({question, allAnswers, onSelect}) {
  let allOptions = allAnswers.map((item, i) => arrayToKeyValue(item, i));

  shuffle(allOptions);

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function arrayToKeyValue(item, i) {
    if (allAnswers.length === i + 1) {
      //last option is true
      let obj = new Object();
      obj.option = item;
      obj.isTrue = true;
      return obj;
    } else {
      let obj = new Object();
      obj.option = item;
      obj.isTrue = false;
      return obj;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View>
        <RadioGroup onSelect={(index, value) => onSelect(index, value)}>
          {allOptions.map((item) => (
            <RadioButton value={item} color="green">
              <Text>{item.option}</Text>
            </RadioButton>
          ))}
        </RadioGroup>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    margin: 10,
  },
  container: {
    marginBottom: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    padding: 10,
    fontSize: 14,
  },
});
export default Card;
