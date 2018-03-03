import Web3 from 'web3';

import { ETH_PROVIDER_URL, ETH_PROVIDER_URL_ROPSTEN } from 'constants';


export function getProviderUrl() {
  if (window.location.href.indexOf('ropsten.') !== -1) {
    console.log('using ropsten!!');
    return ETH_PROVIDER_URL_ROPSTEN;
  }
  return ETH_PROVIDER_URL;
}

const getWeb3 = new Promise(((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let results;
    let { web3 } = window;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.

      console.log('metamask web3 provider? ', web3.currentProvider);
      web3 = new Web3(web3.currentProvider);

      const networkFallback = ETH_PROVIDER_URL.indexOf('127.') > -1 || ETH_PROVIDER_URL.indexOf('localhost') > -1 ? 'private' : 'main';
      const expectedNetwork = window.location.href.indexOf('ropsten.') > -1 ? 'ropsten' : networkFallback;

      results = {
        web3,
        expectedNetwork,
        injected: true,
      };

      console.log('Injected web3 detected.');

      resolve(results);
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      const providerUrl = getProviderUrl();
      const provider = new Web3.providers.HttpProvider(providerUrl);

      web3 = new Web3(provider);

      results = {
        web3,
      };

      console.log('No web3 instance injected, using Local web3.');

      resolve(results);
    }
  });
}));

export default getWeb3;
