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
      return simpleStorageInstance.getText(2)
    })
    .then((result) => {
      console.log('result?? ', result)
      return dispatch(setFeaturedText(result))
    })
    .catch((error) => {
      console.log('error? ', error)
    })

  }
}

export function setFeaturedText(text) {
  return {
    type: SET_FEATURED_TEXT,
    payload: {
      text
    },
  };
}

export function archiveText(text) {
  return (dispatch, getState) => {
      const { web3 } = getState();

      simpleStorage.setProvider(web3.currentProvider)
      var simpleStorageInstance;

      web3.eth.getAccounts((error, accounts) => {
        simpleStorage.deployed().then((instance) => {
          simpleStorageInstance = instance
          return simpleStorageInstance.archiveText(text, {from: accounts[0]})
        }).then((result) => {
          console.log('got result??', result)
        })
      })
  }
}
