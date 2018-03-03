import { SET_WEB3 } from './actions';

const initialState = {
  web3: null,
  injected: null,
  initialized: false,
  expectedNetwork: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEB3:
      const { web3, injected, expectedNetwork } = action.payload;
      return {
        ...web3,
        injected,
        expectedNetwork,
        initialized: true,
      };
    default:
      return state;
  }
};
