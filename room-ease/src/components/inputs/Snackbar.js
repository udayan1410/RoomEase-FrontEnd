import React from 'react';
import * as classes from './snackbar.module.css';

const Snackbar = props => {
    let displayClasses = [classes.HideSnackbar];

    let message = props.message;

    if (message.length > 0) {
        displayClasses.push(classes.ShowSnackbar)
        setTimeout(() => {
            props.hideMessage();
        }, 1500)
    }

    return (<div className={displayClasses.join(" ")}>{message}</div>);

}
export default Snackbar;