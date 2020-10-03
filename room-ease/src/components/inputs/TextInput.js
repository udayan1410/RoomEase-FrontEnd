//reusable text input
import React from 'react';
const TextInput = props => {
    
    return (
      <div>
        <input
          type="text"
          value={props.value}
          onChange={event => console.log("value changed!")}
        />
      </div>
    );
  };
  
  export default TextInput;




