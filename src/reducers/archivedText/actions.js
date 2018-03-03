// eslint-disable-next-line
import EthTxtContract from 'contracts/EthTxt.json';

// local web3, not metamask
import Web3 from 'web3';
// used for stuff metamask isnt good at, like filtering events

import { getProviderUrl } from 'utils/getWeb3';

const PROVIDER_URL = getProviderUrl();

const localProvider = new Web3.providers.HttpProvider(PROVIDER_URL);

export const SUBMIT_TEXT_START = 'SUBMIT_TEXT_START';
export const SUBMIT_TEXT_END = 'SUBMIT_TEXT_END';

const contract = require('truffle-contract');

const simpleStorage = contract(EthTxtContract);

export function getTransactionReceipt({ tx }) {
  return (dispatch, getState) => {
    const { web3 } = getState();
    simpleStorage.setProvider(localProvider);
    return new Promise((resolve, reject) => {
      web3.eth.getTransactionReceipt(tx, (err, data) => {
        if (err || !data) {
          return reject();
        }
        return resolve(data);
      });
    });
  };
}

export function getReceiptData({ tx, blockNumber, fromAddress }) {
  return (dispatch, getState) => {
    const { web3 } = getState();
    simpleStorage.setProvider(localProvider);

    return new Promise((resolve, reject) => {
      simpleStorage.deployed().then((instance) => {
        console.log('instance?? ', instance, ' simpleStorage ', simpleStorage);
        const myContract = new web3.eth.Contract(instance.abi, instance.address);
        console.log('got event.. ', fromAddress, ' block ', blockNumber);
        myContract.getPastEvents('NewText', {
          filter: { submitter: fromAddress },
          fromBlock: blockNumber,
          toBlock: blockNumber,
        })
          .then((events) => {
            console.log('in contract response... ', events);
            if (!events || !events.length) {
              return reject();
            }
            const foundEvent = events.find((item) => {
              return item.transactionHash === tx;
            });
            if (foundEvent) {
              return resolve(foundEvent);
            }
            return reject();
          })
          .catch((error) => {
            console.log('error getting data... ', error);
          });
      });
    });
  };
}

export function getArchivedText(code) {
  return (dispatch, getState) => {
    simpleStorage.setProvider(localProvider);
    let simpleStorageInstance;

    return new Promise((resolve, reject) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance;
        return simpleStorageInstance.getDataFromCode(code);
      })
        .then((result) => {
          console.log('got result from data lookup: ', result);
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function archiveText(text) {
  return (dispatch, getState) => {
    const { web3 } = getState();

    simpleStorage.setProvider(web3.currentProvider);
    let simpleStorageInstance;

    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, accounts) => {
        simpleStorage.deployed().then((instance) => {
          simpleStorageInstance = instance;
          dispatch({ type: SUBMIT_TEXT_START });
          return simpleStorageInstance.archiveText(text, { from: accounts[0], gas: 120000, gasPrice: 4000000000 })
            .on('transactionHash', (hash) => {
              dispatch({ type: SUBMIT_TEXT_END });
              resolve(hash);
            })
            .on('receipt', (receipt) => {
              console.log('in receipt event... ', receipt);
            })
            .on('error', (err) => { reject(err); })
        });
      });
    });
  };
}
