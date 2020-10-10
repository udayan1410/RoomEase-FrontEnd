import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import * as classes from './taskinfo.module.css'

const TaskInfoSelect = props => {

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let renderDays = () => {
        let modifyClasses = (day) => {
            let dayClasses = [classes.Day];
            if (props.days.length > 0 && props.days.includes(day))
                dayClasses.push(classes.DaySelected);


            return dayClasses.join(" ");
        }

        let daysOfTheWeek = (
            <div className={classes.Container}>
                {days.map(day => {
                    return (
                        <span
                            className={modifyClasses(day)}
                            key={day}
                            onClick={() => props.daySelected(day)}
                        >
                            {day}
                        </span>)
                })}
            </div>
        );

        return daysOfTheWeek;
    }

    return (
        <Auxillary>
            {renderDays()}
        </Auxillary>
    );
}

export default TaskInfoSelect;
