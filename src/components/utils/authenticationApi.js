import axios from 'axios';

export const authenticationApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await authenticationApi.get('/authentication/token/new');
    if (data.success) {
      const token = data.request_token;
      localStorage.setItem('token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateSession = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const { data: { session_id } } = await authenticationApi.post('/authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session', session_id);
      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
