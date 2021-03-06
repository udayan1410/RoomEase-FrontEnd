import * as classes from './backdrop.module.css';
import React from 'react';

const Backdrop = props => <div className={props.show ? classes.backdrop : null} onClick={props.onClick} >{props.children}</div>

export default Backdrop;