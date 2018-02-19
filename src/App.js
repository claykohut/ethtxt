import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'


import './css/harabara-mais.css'
import './index.css';

import './App.css'

import Home from 'routes/Home';
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
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/text' component={FeaturedTextContainer}/>
          {/* <Route path='/roster' component={Roster}/> */}
        </Switch>
      </div>
    );
  }
}

export default App
