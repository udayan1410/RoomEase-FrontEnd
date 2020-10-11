import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import * as classes from './timeinput.module.css'

const TimeInput = props => {

    return (
        <div className={classes.Container}>
            <p>Select Time</p>
            <input type="number" placeholder="HH" className={classes.HourDisplay}></input>
            <input type="number" placeholder="MM" className={classes.HourDisplay}></input>
            <select className={classes.AM}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div >

    )
}

export default TimeInput;