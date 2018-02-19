import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'


import './css/harabara-mais.css'
import './index.css';

import './App.css'

import HomeRoute from 'routes/HomeRoute';
import ReceiptRoute from 'routes/ReceiptRoute';
import TextRoute from 'routes/TextRoute';

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
        <Switch>
          <Route exact path='/' component={HomeRoute}/>
          <Route exact path='/receipt/:tx' component={ReceiptRoute}/>
          <Route exact path='/:code' component={TextRoute}/>
        </Switch>
      </div>
    );
  }
}

export default App
