import { combineReducers } from 'redux';
import web3 from 'reducers/web3';
import archivedText from 'reducers/archivedText';

export default combineReducers({
  web3,
  archivedText,
});
