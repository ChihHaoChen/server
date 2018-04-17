import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () =>
  // in our development, we already set proxy to allow the front-end directly to call back-end.
  // in production, there's no React server, so we don't need to have proxy to channel the front- and the back-end. So this relative path will be connected to the back-end server.
  async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
