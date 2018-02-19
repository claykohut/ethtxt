import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'


import './css/harabara-mais.css'
import './index.css';

import './App.css'

import HomeRoute from 'routes/HomeRoute';
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
          <Route exact path='/text/:id' component={TextRoute}/>
        </Switch>
      </div>
    );
  }
}

export default App
