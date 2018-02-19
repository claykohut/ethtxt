import {
  SET_FEATURED_TEXT,
  SUBMIT_TEXT_START,
  SUBMIT_TEXT_END
} from './actions';

const initialState = {
  text: '',
  submitting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FEATURED_TEXT:
      return {
        text: action.payload.text
      }
    case SUBMIT_TEXT_START:
      return {
        submitting: true
      }
    case SUBMIT_TEXT_END:
      return {
        submitting: false
      }
    default:
      return state;
  }
};
