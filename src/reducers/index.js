import { combineReducers } from 'redux';
import web3 from 'reducers/web3';
import featuredText from 'reducers/featuredText';

export default combineReducers({
  web3,
  featuredText,
});
