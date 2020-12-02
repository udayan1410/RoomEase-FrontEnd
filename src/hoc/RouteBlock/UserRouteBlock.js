import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../../containers/Account/Login/Login';


const UserRouteBlock = ({ path, component }) => {

    let componentToRender = component;

    if (localStorage.getItem("userID") == "null") {
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