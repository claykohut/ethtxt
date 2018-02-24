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

export function getReceiptData({ tx, blockNumber, fromAddress }) {
  return (dispatch, getState) => {
    const { web3 } = getState();
    simpleStorage.setProvider(localProvider)
    var simpleStorageInstance;

    return new Promise((resolve, reject) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        var myContract = new web3.eth.Contract(instance.abi, instance.address);
        myContract.getPastEvents('NewText', {
            filter: {submitter: fromAddress},
            fromBlock: blockNumber,
            toBlock: blockNumber
        })
        .then(function(events){
            console.log(events)
            if(!events || !events.length) {
              return reject();
            }
            const foundEvent = events.find((item) => {
              return item.transactionHash === tx;
            })
            if(foundEvent) {
              return resolve(foundEvent);
            }
            return reject();
        });
      })
    });

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
            dispatch({ type: SUBMIT_TEXT_START });
            return simpleStorageInstance.archiveText(text, {from: accounts[0], gas: 120000, gasPrice: 4000000000 })
              .on('transactionHash', function(hash){
                dispatch({ type: SUBMIT_TEXT_END });
                resolve(hash)
              })
              .on('receipt', function(receipt){
                // console.log("in receipt... ", receipt)
              })
              .on('error', () => { reject() });
            })

        })

      })
  }
}
