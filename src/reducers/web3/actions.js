import getWeb3 from 'utils/getWeb3'

import { getFeaturedText } from 'reducers/featuredText/actions';

export const SET_WEB3 = 'SET_WEB3';

export function initWeb3() {
  return dispatch => {
    getWeb3
      .then(({ web3 }) => {
        dispatch(setWeb3(web3));
        dispatch(getFeaturedText());
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
