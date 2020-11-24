import React from 'react';
import * as classes from './tasktable.module.css';

const TaskTable = props => {

    return (
        <table className={classes.Table}>
            <thead>
                <tr>
                    <th><p>Days of the Week</p></th>
                    <th><p>Time of the Day</p></th>
                    <th><p>Users</p></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

    )

}

export default TaskTable;