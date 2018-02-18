import EthTxtContract from 'contracts/EthTxt.json'

export const SET_FEATURED_TEXT = 'SET_FEATURED_TEXT';

const contract = require('truffle-contract')
const simpleStorage = contract(EthTxtContract)

let textEventWatch = null;

export function setEventWatch(contractInstance) {
  return (dispatch, getState) => {
    if(!textEventWatch) {
      textEventWatch = true;
      contractInstance.NewText({}, {fromBlock: "latest", toBlock: "pending"})
        .watch((error, data) => {
          if(data.args && data.args.text) {
            dispatch(setFeaturedText(data.args.text));
          }
        })
    }
  }
}

export function getFeaturedText() {
  return (dispatch, getState) => {
    const { web3 } = getState();

    simpleStorage.setProvider(web3.currentProvider)
    var simpleStorageInstance;

    simpleStorage.deployed().then((instance) => {
      simpleStorageInstance = instance
      if(!textEventWatch){
        dispatch(setEventWatch(simpleStorageInstance));
      }
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
          return dispatch(getFeaturedText());
        })
      })
  }
}
