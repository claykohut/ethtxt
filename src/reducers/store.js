import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducer from 'reducers';

import { initWeb3 } from 'reducers/web3/actions';

const store = createStore(reducer, compose(
  applyMiddleware(thunk, promiseMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(initWeb3())

export default store;
