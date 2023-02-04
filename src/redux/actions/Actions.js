import {
  SET_DATA,
  SET_LOADER,
  CLOSE_LOADER,
  SET_PROFILE,
  CLOSE_PROFILE,
} from '../ActionTypes';
import axios from 'axios';

export const fetchData = () => {
  return async dispatch => {
    dispatch({type: SET_LOADER});
    try {
      const URL =
        'https://newsapi.org/v2/top-headlines?country=in&apiKey=363d7942260b46b3bdc1fd2f5dad2821';
      const {
        data: {articles},
      } = await axios.get(URL);
      dispatch({type: SET_DATA, payload: articles});
      dispatch({type: CLOSE_LOADER});
    } catch (error) {
      console.error(error);
      dispatch({type: CLOSE_LOADER});
    }
  };
};
