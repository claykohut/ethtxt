import EthTxtContract from 'contracts/EthTxt.json'

export const SET_FEATURED_TEXT = 'SET_FEATURED_TEXT';

const contract = require('truffle-contract')
const simpleStorage = contract(EthTxtContract)

export function getFeaturedText() {
  return (dispatch, getState) => {
    const { web3 } = getState();

    simpleStorage.setProvider(web3.currentProvider)
    var simpleStorageInstance;

    simpleStorage.deployed().then((instance) => {
      simpleStorageInstance = instance
      return simpleStorageInstance.get();
    })
    .then((result) => {
      return dispatch(setFeaturedText(result))
    })

  }
}

export function setFeaturedText(text) {
  console.log('updating featured text... ', text)
  return {
    type: SET_FEATURED_TEXT,
    payload: {
      text
    },
  };
}

export function changeFeaturedText(text) {
  return (dispatch, getState) => {
      const { web3 } = getState();

      simpleStorage.setProvider(web3.currentProvider)
      var simpleStorageInstance;

      web3.eth.getAccounts((error, accounts) => {
        simpleStorage.deployed().then((instance) => {
          simpleStorageInstance = instance
          return simpleStorageInstance.set(text, {from: accounts[0]})
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return dispatch(getFeaturedText());
        })
      })
  }
}
