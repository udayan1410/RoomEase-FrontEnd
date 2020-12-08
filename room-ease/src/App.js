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
import * as ClientRoutes from './constants/ClientRoutes';
import RoomRouteBlock from './hoc/RouteBlock/RoomRouteBlock';
import UserRouteBlock from './hoc/RouteBlock/UserRouteBlock'

class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <Switch>
          {/* Authentication */}
          <Route path={ClientRoutes.LOGIN_URL} component={Login} />
          <Route path={ClientRoutes.SIGNUP_URL} component={Signup} />

          {/* Rooms */}
          <UserRouteBlock path={ClientRoutes.ROOM_JOIN_URL} component={JoinRoom} />
          <UserRouteBlock path={ClientRoutes.ROOM_CREATE_URL} component={CreateRoom} />
          <RoomRouteBlock path={ClientRoutes.ROOM_HOMEPAGE} Component={Homepage} />


          {/* Tasks */}
          <UserRouteBlock path={ClientRoutes.TASK_CREATE_URL} component={CreateTask} />
          <UserRouteBlock path={ClientRoutes.USER_PROFILE_URL} component={UserProfile} />

          {/* Notes */}
          <UserRouteBlock path={ClientRoutes.CREATE_NOTES_URL} component={CreateNotes} />
          <UserRouteBlock path={ClientRoutes.SINGLE_NOTE_URL} component={EditNote} />
          <UserRouteBlock path={ClientRoutes.NOTES_URL} component={ViewAllNotes} />

          {/* SplitEase */}
          <UserRouteBlock path={ClientRoutes.SPLIT_EASE_URL} component={SplitEase} />

          <Route path={ClientRoutes.BASE_URL} component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;