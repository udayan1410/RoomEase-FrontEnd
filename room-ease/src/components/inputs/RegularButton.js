//reusable text input
import React from 'react';
import * as classes from './regularbutton.module.css';

const RegularButton = props => {

    let buttonClasses = [classes.Button, props.extraStyles];

    if (props.disabled)
        buttonClasses.push(classes.ButtonDisabled);

    else {
        buttonClasses.push(classes.ButtonEnabled);
    }

    if (props.type === "danger") {
        buttonClasses.push(classes.ButtonDanger);
    }

    if (props.type === "warning") {
        buttonClasses.push(classes.ButtonWarning);
    }

    return (
        <div>
            <input
                className={buttonClasses.join(" ")}
                type="button"
                value={props.text}
                onClick={props.onClick}
                disabled={props.disabled ? props.disabled : false}
            ></input>
        </div>
    );
};

export default RegularButton;




