import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Cookies from 'cookies-js';
import axios from 'axios';
import rootReducer from '../reducers';
import rootSaga from '../middleware';

const sagaMiddleware = createSagaMiddleware();
const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = tool;
const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, middleware);

const token = localStorage.getItem('jwt-token');
axios.defaults.headers.common['Authorization'] = token;

sagaMiddleware.run(rootSaga);

export default store;
