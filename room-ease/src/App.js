import React, { Component } from 'react';
import * as classes from './App.module.css';
import { Route, Switch } from 'react-router-dom'
import Login from './containers/Account/Login/Login';
import Signup from './containers/Account/Signup/Signup';
import JoinRoom from './containers/JoinRoom/JoinRoom'
import Homepage from './containers/Homepage/Homepage';
import Layout from './hoc/Layout/Layout';


class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Layout>
            <Route path="/room/join" component={JoinRoom} />
          </Layout>
          <Route path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default App;