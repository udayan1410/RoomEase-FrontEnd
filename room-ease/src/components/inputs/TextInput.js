//reusable text input
import React from 'react';
import * as classes from './textinput.module.css';

const TextInput = props => {

  return (
    <div>
      <input
        className={classes.Input}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.hint}
      />
    </div>
  );
};

export default TextInput;




