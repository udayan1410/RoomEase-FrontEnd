import React from 'react';
import * as classes from './navigationdrawer.module.css';

const NavigationDrawer = props => {

    let viewDrawer = [classes.container]

    if (props.view) {
        viewDrawer.push(classes.ViewContainer);
    }
    else
        viewDrawer.push(classes.HideContainer);

    return (
        <div className={viewDrawer.join(' ')}>
            <h1>TEXT</h1>
            <h1>TEXT</h1>
            <h1>TEXT</h1>
            <h1>TEXT</h1>
        </div>
    )

}

export default NavigationDrawer;