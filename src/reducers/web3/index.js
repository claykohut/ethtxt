import { SET_WEB3 } from './actions';

const initialState = {
  web3: null,
  injected: null,
  initialized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEB3:
      const { web3, injected } = action.payload;
      return {
        ...web3,
        injected,
        initialized: true,
      };
    default:
      return state;
  }
};
