import React from 'react';
import * as classes from './errormessage.module.css';


const ErrorMessage = props => <p className={classes.error}>{props.message}</p>

export default ErrorMessage;