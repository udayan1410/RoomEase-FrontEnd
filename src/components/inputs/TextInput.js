//reusable text input
import React from 'react';
import * as classes from './textinput.module.css';

const TextInput = props => {
  let inputArea = null;


  if (props.type === "number") {

    inputArea = (
      <input
        min={1}
        onChange={(event) => props.onChange(event, "number")}
        placeholder={props.hint}
        type="number"
        value={props.value}
        className={classes.Number}
      >

      </input>
    )
  }


  else if (props.type === "textarea")
    inputArea = (
      <textarea
        rows="4"
        cols="50"
        onChange={(event) => props.onChange(event, "textarea")}
        placeholder={props.hint}
        value={props.value}
        className={classes.Textarea}>
      </textarea>)

  else {
    inputArea = (<input
      className={classes.Input}
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={(event) => props.onChange(event, "text")}
      placeholder={props.hint}
      onKeyDown={props.onKeyDown}
      ref={props.reference}
    />)
  }

  return (
    <div className={classes.Container}>
      { inputArea}
    </div>
  );
};

export default TextInput;




