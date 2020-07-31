import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Card from '../components/Card';
import AppButton from '../components/AppButton';
import colors from '../app/assets/config/colors';

function Quiz({navigation}) {
  const API_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard';
  const answerArray = [];
  const [quizCompleated, setQuizCompleated] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizQuestions, setQuizQuestion] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Welcome');
    } catch (e) {
      console.log(e);
    }
  };

  handleLogout = () => {
    clearAll();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Logout" onPress={() => handleLogout()} />
      ),
    });
  });

  const loadData = async () => {
    const response = await fetch(API_URL);
    const questions = await response.json();
    const {results} = questions;
    results.forEach((item) => {
      item.id = Math.floor(Math.random() * 10000);
    });

    setQuizQuestion(results);
    setIsDataLoading(false);
  };

  const alertTo = () => {
    Alert.alert(
      'Quiz',
      'Quiz is not compleated',
      [{text: 'OK', onPress: () => setQuizCompleated(false)}],
      {cancelable: false},
    );
  };

  const handleSubmitPress = () => {
    answerArray.length === quizQuestions.length
      ? setQuizCompleated(true)
      : alertTo();
    setCorrectAnswers(
      answerArray.filter((element) => element.isOptionTrue === true).length,
    );
  };

  const handleCardItem = (index, value, item) => {
    //find the question index
    let questionIndex = quizQuestions.indexOf(item);

    //create a collection for question index and answer
    let collection = new Object();
    collection.questionIndex = questionIndex;
    collection.isOptionTrue = value.isTrue;

    //if collection object already exist in answer array then delete it first
    answerArray.forEach(function (ans, index, object) {
      if (ans.questionIndex === collection.questionIndex) {
        object.splice(index, 1);
      }
    });

    //finally push collection object into answer array
    answerArray.push(collection);
  };

  return isDataLoading ? (
    <SafeAreaView style={styles.loadingQuestions}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Please wait while we are loading questions for you</Text>
    </SafeAreaView>
  ) : !quizCompleated ? (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={quizQuestions}
        keyExtractor={(quizQuestion) => quizQuestion.id.toString()}
        renderItem={({item}) => (
          <Card
            question={item.question}
            allAnswers={item.incorrect_answers.concat(item.correct_answer)}
            onSelect={(index, value) => handleCardItem(index, value, item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <AppButton
        style={styles.bottom}
        title="Submit"
        onPress={() => handleSubmitPress()}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.quizCompleateScreen}>
      <Text>Quiz Compleated</Text>
      <Text>Number of correct answers : {correctAnswers}</Text>
      <AppButton title="Play Again" onPress={() => setQuizCompleated(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 80,
  },
  screen: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  quizCompleateScreen: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightGray,
  },
  loadingQuestions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
