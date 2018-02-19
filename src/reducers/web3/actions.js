import getWeb3 from 'utils/getWeb3'

export const SET_WEB3 = 'SET_WEB3';

export function initWeb3() {
  return dispatch => {
    getWeb3
      .then(({ web3 }) => {
        dispatch(setWeb3(web3));
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }
}

export function setWeb3(web3) {
  return {
    type: SET_WEB3,
    payload: {
      web3
    },
  };
}
