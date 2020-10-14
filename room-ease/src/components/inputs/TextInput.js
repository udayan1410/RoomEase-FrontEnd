//reusable text input
import React from 'react';
import * as classes from './textinput.module.css';

const TextInput = props => {
  let inputArea = null;

  if (props.type === "textarea")
    inputArea = (<textarea rows="4" cols="50" onChange={props.onChange} placeholder={props.hint}></textarea>)

  else {
    inputArea = (<input
      className={classes.Input}
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.hint}
    />)
  }

  return (
    <div className={classes.Container}>
      { inputArea}
    </div>
  );
};

export default TextInput;




