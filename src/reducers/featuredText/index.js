import { SET_FEATURED_TEXT } from './actions';

const initialState = {
  text: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FEATURED_TEXT:
      return {
        text: action.payload.text
      }
    default:
      return state;
  }
};
