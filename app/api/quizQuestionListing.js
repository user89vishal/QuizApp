import client from './client';

const endPoint = '/api.php?amount=10&difficulty=hard';

const getQuizQuestionListing = () => client.get(endPoint);

export default {
  getQuizQuestionListing,
};
