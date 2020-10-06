import React, { Component } from 'react';
import * as classes from './App.module.css';
import { Route, Switch } from 'react-router-dom'
import Login from './containers/Account/Login/Login';
import Signup from './containers/Account/Signup/Signup';
import JoinRoom from './containers/JoinRoom/JoinRoom'
import CreateRoom from './containers/CreateRoom/CreateRoom'

import { LOGIN_URL, SIGNUP_URL, ROOM_JOIN_URL, BASE_URL, ROOM_CREATE_URL } from './constants/ClientRoutes';

class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path={LOGIN_URL} component={Login} />
          <Route path={SIGNUP_URL} component={Signup} />
          <Route path={ROOM_JOIN_URL} component={JoinRoom} />
          <Route path={ROOM_CREATE_URL} component={CreateRoom} />
          <Route path={BASE_URL} component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;