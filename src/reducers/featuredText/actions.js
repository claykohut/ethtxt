import EthTxtContract from 'contracts/EthTxt.json'

// local web3, not metamask
import Web3 from 'web3'
// used for stuff metamask isnt good at, like filtering events

import { getProviderUrl } from 'utils/getWeb3';

const PROVIDER_URL = getProviderUrl();

const localProvider = new Web3.providers.HttpProvider(PROVIDER_URL)

export const SET_FEATURED_TEXT = 'SET_FEATURED_TEXT';
export const SUBMIT_TEXT_START = 'SUBMIT_TEXT_START';
export const SUBMIT_TEXT_END = 'SUBMIT_TEXT_END';

const contract = require('truffle-contract')
const simpleStorage = contract(EthTxtContract)

export function getReceiptData({ tx, blockNumber }) {
  return (dispatch, getState) => {
    const { web3 } = getState();
    simpleStorage.setProvider(localProvider)
    var simpleStorageInstance;

    return new Promise((resolve, reject) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        const allEvents = instance.allEvents({
          fromBlock: blockNumber,
          toBlock: blockNumber
        });
        allEvents.get((err, res) => {
          console.log('in all events get... ', err,  'res ', res )
          if(err) return reject(err);
          if(res.length) {
            const foundEvent = res.find((item) => {
              return item.transactionHash === tx;
            })
            if(foundEvent) {
              return resolve(foundEvent);
            }
          }
          return reject();
        });
      })
    })

  }
}

export function getArchivedText(code) {
  return (dispatch, getState) => {
    const { web3 } = getState();

    simpleStorage.setProvider(localProvider);
    var simpleStorageInstance;

    return new Promise((resolve, reject) => {
        simpleStorage.deployed().then((instance) => {
          simpleStorageInstance = instance
          return simpleStorageInstance.getText(code || '0')
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
            // send transaciton recturns immediately but needs to poll for receipt when tx is mined
            return simpleStorageInstance.archiveText.sendTransaction(text, {from: accounts[0]});
            // calling method directly returns with receiot data but you have to wait until tx is mined
            // this is the simpler approach but makes users wait a long time on a spinner
            //return simpleStorageInstance.archiveText(text, {from: accounts[0]})
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
