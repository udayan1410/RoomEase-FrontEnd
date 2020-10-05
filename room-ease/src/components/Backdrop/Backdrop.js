import * as classes from './backdrop.module.css';
import React from 'react';

const Backdrop = props => {

    return (
        <div className={props.show ? classes.backdrop : null} onClick={props.onClick} />
    )
}

export default Backdrop;