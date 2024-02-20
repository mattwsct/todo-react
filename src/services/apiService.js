import axios from 'axios';

const BASE_URL = 'https://nanameue-front-end-candidate-test.vercel.app';

const apiService = axios.create({
  baseURL: BASE_URL,
});

export default apiService;
