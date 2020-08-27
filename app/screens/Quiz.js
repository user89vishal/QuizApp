import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import quizQuestionListingApi from '../api/quizQuestionListing';

import Card from '../components/Card';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';

function Quiz({navigation}) {
  const answerArray = [];
  const [quizCompleated, setQuizCompleated] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizQuestions, setQuizQuestion] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    loadQuizQuestion();
  }, []);

  clearCredential = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Welcome');
    } catch (e) {
      console.log('Error is: ', e);
    }
  };

  handleLogout = () => {
    clearCredential();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={colors.lightGray}
          style={styles.startIcon}
          onPress={() => handleLogout()}>
          <Icon name="sign-out" size={30} color={colors.primary} />
        </TouchableHighlight>
      ),
    });
  });

  const loadQuizQuestion = async () => {
    setIsDataLoading(true);
    const response = await quizQuestionListingApi.getQuizQuestionListing();

    if (!response.ok) {
      setIsDataLoading(false);
      setError(true);
      return;
    }

    setError(false);
    const {results} = response.data;
    results.forEach((item) => {
      item.id = Math.floor(Math.random() * 10000);
    });

    setQuizQuestion(results);
    setIsDataLoading(false);
  };

  const quizNotCompleateAlert = () => {
    Alert.alert('Quiz', 'Quiz is not compleated', [{text: 'OK'}], {
      cancelable: false,
    });
  };

  const handleSubmitPress = () => {
    if (answerArray.length === quizQuestions.length) {
      let correctAnswerCount = answerArray.filter(
        (element) => element.isOptionTrue === true,
      ).length;

      setCorrectAnswers(correctAnswerCount);
      setQuizCompleated(true);
    } else {
      quizNotCompleateAlert();
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
      <AppText>Please wait while we are loading questions for you</AppText>
    </SafeAreaView>
  ) : error ? (
    <SafeAreaView style={styles.quizCompleateScreen}>
      <AppText>Error occured, Please retry</AppText>
      <AppButton title="Retry" onPress={() => loadQuizQuestion()} />
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
        style={styles.btn}
        title="Submit"
        onPress={() => handleSubmitPress()}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.screen}>
      <AppText>Quiz Compleated</AppText>
      <AppText>Number of correct answers : {correctAnswers}</AppText>
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
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
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
  startIcon: {
    paddingRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Quiz;
