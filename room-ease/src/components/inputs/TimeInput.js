import React from 'react';
import Auxillary from '../../hoc/Auxillary';


const TimeInput = props => {

    return (
        <div>
            <input type="number" placeholder="HH" pattern="[0-11]"></input>
            <input type="number" placeholder="MM"></input>
            <select>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div >

    )
}

export default TimeInput;