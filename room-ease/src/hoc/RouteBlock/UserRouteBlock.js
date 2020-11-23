import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../../containers/Account/Login/Login';


const UserRouteBlock = ({ path, component }) => {

    let componentToRender = component;
    console.log("In block ", localStorage.getItem("userID"));

    if (localStorage.getItem("userID") == "null") {
        console.log("In block");
        componentToRender = Login;
    }

    return (
        <Route
            path={path}
            component={componentToRender}
        />
    )
}

export default UserRouteBlock;