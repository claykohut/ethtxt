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
  return {
    type: SET_FEATURED_TEXT,
    payload: {
      text
    },
  };
}

// this.state.web3.eth.getAccounts((error, accounts) => {
//   simpleStorage.deployed().then((instance) => {
//     simpleStorageInstance = instance
//   //
//     // Stores a given value, 5 by default.
//     return simpleStorageInstance.set('bro', {from: accounts[0]})
//   }).then((result) => {
//     // Get the value from the contract to prove it worked.
//     console.log('value is?? ', simpleStorageInstance.get.call(accounts[0]))
//     return simpleStorageInstance.get.call(accounts[0])
//   })
//   .then((result) => {
//     // Update state with the result.
//     console.log('got result? ', result)
//     return this.setState({ storageValue: result })
//   })
// })
