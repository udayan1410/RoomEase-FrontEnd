import React, { Component } from 'react';
import * as classes from './App.module.css';
import { Route, Switch } from 'react-router-dom'
import Login from './components/Account/Login/Login';
import Signup from './components/Account/Signup/Signup';

class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;