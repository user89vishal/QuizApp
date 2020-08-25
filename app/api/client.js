import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'https://opentdb.com',
});

export default apiClient;
