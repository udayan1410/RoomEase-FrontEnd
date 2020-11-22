import React, { Component } from 'react';
import * as classes from './App.module.css';
import { Route, Switch } from 'react-router-dom'
import Login from './containers/Account/Login/Login';
import Signup from './containers/Account/Signup/Signup';
import JoinRoom from './containers/JoinRoom/JoinRoom'
import SplitEase from './containers/SplitEase/SplitEase';
import UserProfile from './containers/UserProfile/UserProfile';
import CreateRoom from './containers/CreateRoom/CreateRoom'
import Homepage from './containers/Homepage/Homepage'
import CreateTask from './containers/Tasks/CreateTask/CreateTask'

import CreateNotes from './containers/ViewNotes/CreateNotes/CreateNotes'
import ViewAllNotes from './containers/ViewNotes/AllNotes/AllNotes'
import EditNote from './containers/ViewNotes/EditNote/EditNote'
import { USER_PROFILE_URL, LOGIN_URL, SIGNUP_URL, ROOM_JOIN_URL, BASE_URL, ROOM_CREATE_URL, ROOM_HOMEPAGE, TASK_CREATE_URL, CREATE_NOTES_URL, NOTES_URL, SINGLE_NOTE_URL, SPLIT_EASE_URL } from './constants/ClientRoutes';
// import Singlenote from './containers/ViewNotes/SingleNote/Singlenote';
// import } from './constants/ServerRoutes'

class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <Switch>
          {/* Authentication */}
          <Route path={LOGIN_URL} component={Login} />
          <Route path={SIGNUP_URL} component={Signup} />

          {/* Rooms */}
          <Route path={ROOM_JOIN_URL} component={JoinRoom} />
          <Route path={ROOM_CREATE_URL} component={CreateRoom} />
          <Route path={ROOM_HOMEPAGE} component={Homepage} />

          <Route path={TASK_CREATE_URL} component={CreateTask} />
          <Route path={USER_PROFILE_URL} component={UserProfile} />

          <Route path={CREATE_NOTES_URL} component={CreateNotes} />
          <Route path={SINGLE_NOTE_URL} component={EditNote} />
          <Route path={NOTES_URL} component={ViewAllNotes} />

          <Route path={SPLIT_EASE_URL} component={SplitEase} />

          <Route path={BASE_URL} component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;