import React, { Component } from 'react'
import EthTxtContract from '../build/contracts/EthTxt.json'
import getWeb3 from './utils/getWeb3'

import './css/harabara-mais.css'
import './index.css';

import './App.css'

import Logo from './components/Logo';
import TextBox from './components/TextBox';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract = () => {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(EthTxtContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

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

    simpleStorage.deployed().then((instance) => {
      simpleStorageInstance = instance

      console.log('testing... ', simpleStorageInstance.get())
      return simpleStorageInstance.get();
    })
    .then((result) => {
      console.log('got result.. ', result)
      return this.setState({ storageValue: result })
    })

  }

  render() {
    return (
      <div className="App">
        <Logo />
        <TextBox
          text={this.state.storageValue}
        />
      </div>
    );
  }
}

export default App
