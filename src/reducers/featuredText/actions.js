import EthTxtContract from 'contracts/EthTxt.json'

export const SET_FEATURED_TEXT = 'SET_FEATURED_TEXT';
export const SUBMIT_TEXT_START = 'SUBMIT_TEXT_START';
export const SUBMIT_TEXT_END = 'SUBMIT_TEXT_END';

const contract = require('truffle-contract')
const simpleStorage = contract(EthTxtContract)

export function getReceiptData({ tx, blockNum }) {
  return (dispatch, getState) => {
    const { web3 } = getState();
    simpleStorage.setProvider(web3.currentProvider)
    var simpleStorageInstance;

    simpleStorage.deployed().then((instance) => {
      simpleStorageInstance = instance
      console.log('in get receipt data... ', tx)
      console.log('contract?? ', instance)
      const allEvents = instance.allEvents({
        fromBlock: blockNum,
        toBlock: blockNum
      });
      allEvents.watch((err, res) => {
        if(err) return;
        if(tx === res.transactionHash) {
          console.log('found event! ', res)
        }
      });
    })

  }
}

export function getArchivedText(textId) {
  return (dispatch, getState) => {
    const { web3 } = getState();

    simpleStorage.setProvider(web3.currentProvider)
    var simpleStorageInstance;

    return new Promise((resolve, reject) => {
        simpleStorage.deployed().then((instance) => {
          simpleStorageInstance = instance
          return simpleStorageInstance.getText(textId || 0)
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        })
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

      return new Promise((resolve, reject) => {
        web3.eth.getAccounts((error, accounts) => {
          simpleStorage.deployed().then((instance) => {
            simpleStorageInstance = instance
            console.log('in submit... ', instance)
            dispatch({ type: SUBMIT_TEXT_START });
            // return simpleStorageInstance.archiveText.sendTransaction(text, {from: accounts[0]});
            return simpleStorageInstance.archiveText(text, {from: accounts[0]})
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            dispatch({ type: SUBMIT_TEXT_END });
          })
        })

      })
  }
}
