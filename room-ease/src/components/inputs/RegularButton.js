//reusable text input
import React from 'react';
import * as classes from './regularbutton.module.css';

const RegularButton = props => {

    return (
        <div>
            <input
                className={classes.Button}
                type="button"
                value={props.text}
                onClick={props.onClick}
            ></input>
        </div>
    );
};

export default RegularButton;




