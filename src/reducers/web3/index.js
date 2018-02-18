import { SET_WEB3 } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEB3:
      return action.payload.web3
    default:
      return state;
  }
};
