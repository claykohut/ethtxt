import Web3 from 'web3'

import { ETH_PROVIDER_URL, ETH_PROVIDER_URL_ROPSTEN } from 'constants';

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.

      console.log('metamask web3 provider? ', web3.currentProvider)
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3,
        injected: true,
      }

      console.log('Injected web3 detected.');

      resolve(results)
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      const providerUrl = getProviderUrl();
      var provider = new Web3.providers.HttpProvider(providerUrl);

      web3 = new Web3(provider)

      results = {
        web3: web3,
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
    }
  })
})

export function getProviderUrl() {
  if(location.href.indexOf('ropsten.') !== -1 || location.href.indexOf('firebaseapp.') !== -1) {
    console.log('using ropsten!!')
    return ETH_PROVIDER_URL_ROPSTEN;
  }
  return ETH_PROVIDER_URL;
}

export default getWeb3
