import {createStore, combineReducers, applyMiddleware } from 'redux';
import {FetchData} from '../reducers/Reducers';
import thunkMiddleWare from 'redux-thunk';

const rootReducers = combineReducers({
  FetchData,
});

const middlewares = [thunkMiddleWare];

const Store = createStore(rootReducers, applyMiddleware(...middlewares));
export default Store;
