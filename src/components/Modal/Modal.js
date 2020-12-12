
import React from 'react';
import * as classes from './modal.module.css'

const Modal = (props) => {
    return (<div className={classes.Modal}>{props.children}</div>);
}

export default Modal;