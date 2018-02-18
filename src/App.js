import React, { Component } from 'react'

import './css/harabara-mais.css'
import './index.css';

import './App.css'

import Logo from './components/Logo';

import FeaturedTextContainer from 'containers/FeaturedTextContainer';

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
        <FeaturedTextContainer />
      </div>
    );
  }
}

export default App
