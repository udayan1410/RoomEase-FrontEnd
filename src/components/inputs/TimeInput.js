import React from 'react';

import * as classes from './timeinput.module.css'

const TimeInput = props => {

    let handleTimeChange = (event) => {
        let time = event.target.value;
        let timeSplit = time.split(":");
        let hours = timeSplit[0];
        let minutes = timeSplit[1];
        let timePeriod = "AM";

        if (hours > 12) {
            hours -= 12;
            timePeriod = "PM"
        }

        props.changedTime(hours, "hours")
        props.changedTime(minutes, "minutes")
        props.changedtimePeriod(timePeriod)
    }


    let parseAndSetTime = () => {

        let { hours, minutes, timePeriod } = props;

        if (timePeriod === "PM")
            hours = "" + parseInt(parseInt(hours) + 12)

        return `${hours}:${minutes}`
    }

    return (
        <div className={classes.Container}>
            <p>Select Time</p>
            <input
                type="time"
                min="07:00"
                max="23:00"
                onChange={handleTimeChange}
                value={parseAndSetTime()}
            />

        </div >

    )
}

export default TimeInput;