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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Card from '../components/Card';
import AppButton from '../components/AppButton';
import AppButtonSmall from '../components/AppButtonSmall';
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
        <AppButtonSmall title="Logout" onPress={() => handleLogout()} />
      ),
    });
  });

  const loadData = async () => {
    if (quizQuestions.length === 0) {
      console.log('Api call');
      const response = await fetch(API_URL);
      const questions = await response.json();
      const {results} = questions;
      results.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000);
      });

      setQuizQuestion(results);
      setIsDataLoading(false);
    }
  };

  const alertTo = () => {
    Alert.alert('Quiz', 'Quiz is not compleated', [{text: 'OK'}], {
      cancelable: false,
    });
  };

  const handleSubmitPress = () => {
    if (answerArray.length === quizQuestions.length) {
      let correctAnswerCount = answerArray.filter(
        (element) => element.isOptionTrue === true,
      ).length;
      console.log('No of correct answers: ', correctAnswerCount);

      setCorrectAnswers(correctAnswerCount);
      setQuizCompleated(true);
    } else {
      alertTo();
      console.log('quiz is not compleated');
    }
  };

  const handleCardItem = (index, value, item) => {
    //find the question id
    let questionId = item.id;

    //create a collection for question id and answer
    let collection = new Object();
    collection.questionId = questionId;
    collection.isOptionTrue = value.isTrue;

    //if collection object already exist in answer array then delete it first
    answerArray.forEach(function (ans, index, object) {
      if (ans.questionId === collection.questionId) {
        object.splice(index, 1);
      }
    });

    // //finally push collection object into answer array
    answerArray.push(collection);

    console.log(answerArray);
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
            key={item.id}
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
