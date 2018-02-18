import React, { Component } from 'react'
import EthTxtContract from '../build/contracts/EthTxt.json'
import getWeb3 from './utils/getWeb3'

import './css/harabara-mais.css'
import './index.css';

import './App.css'

import Logo from './components/Logo';
import TextBox from './components/TextBox';
import Button from './components/Button';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  render() {
    return (
      <div className="App">
        <Logo />
        <TextBox
        />
        <Button
          text="Change this text for 0.1 ETH"
          onClick={() => {
            console.log('clicking...')
          }}
        />
      </div>
    );
  }
}

export default App
