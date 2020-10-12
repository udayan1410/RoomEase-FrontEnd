import React from 'react';
import * as classes from './timeinput.module.css'

const TimeInput = props => {

    return (
        <div className={classes.Container}>
            <p>Select Time</p>
            <input
                type="number"
                placeholder="HH"
                className={classes.HourDisplay}
                onChange={(event) => props.changedTime(event, "hours")}
                value={props.hours}
            />
            <input
                type="number"
                placeholder="MM"
                className={classes.HourDisplay}
                onChange={(event) => props.changedTime(event, "minutes")}
                value={props.minutes}
            />
            <select className={classes.AM} value={props.timePeriod} onChange={props.changedtimePeriod}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div >

    )
}

export default TimeInput;