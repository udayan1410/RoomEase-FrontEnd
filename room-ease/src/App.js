import React, { Component } from 'react';
import * as classes from './App.module.css';
import { Route } from 'react-router-dom'
import Login from './components/Account/Login/Login';
import Signup from './components/Account/Signup/Signup';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App;