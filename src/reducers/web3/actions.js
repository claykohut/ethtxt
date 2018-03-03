import getWeb3 from 'utils/getWeb3';

export const SET_WEB3 = 'SET_WEB3';

export function setWeb3({ web3, injected, expectedNetwork }) {
  return {
    type: SET_WEB3,
    payload: {
      web3,
      injected,
      expectedNetwork,
    },
  };
}

export function initWeb3() {
  return (dispatch) => {
    getWeb3
      .then(({ web3, injected = false, expectedNetwork }) => {
        console.log('got web3 with expectedNetwork? ', expectedNetwork)
        dispatch(setWeb3({ web3, injected, expectedNetwork }));
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  };
}
