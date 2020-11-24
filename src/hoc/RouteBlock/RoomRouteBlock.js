import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../../containers/Account/Login/Login';
import JoinRoom from '../../containers/JoinRoom/JoinRoom'


const RoomRouteBlock = ({ path, Component }) => {

    let componentToRender = Component;


    if (localStorage.getItem("userID") === "null")
        componentToRender = Login;

    else if (localStorage.getItem("roomName") === "null")
        componentToRender = JoinRoom;


    return (
        <Route
            path={path}
            component={componentToRender}
        />
    )
}

export default RoomRouteBlock;