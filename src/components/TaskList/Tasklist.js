import * as classes from './tasklist.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROOM_URL } from '../../constants/ClientRoutes';

const Tasklist = props => {
    return (

        <div className={classes.Container}>
            {props.tasks.map(task => {
                const MAX_LENGTH = 50;

                let shortTaskComments = task.comments;
                if (shortTaskComments.length > MAX_LENGTH)
                    shortTaskComments = shortTaskComments.slice(0, MAX_LENGTH) + "...";

                return (
                    <Link
                        to={`${ROOM_URL}/${props.roomName}/tasks/${task._id}`}
                        key={task._id}
                        style={{ textDecoration: "none" }}
                        className={classes.Link}
                    >
                        <div className={classes.MainItem}>
                            <div className={classes.ColorShade} style={{ backgroundColor: task.color }} />
                            <div className={classes.ListItem}>
                                <p className={classes.TaskName}>{task.taskName}</p>
                                <p className={classes.TaskComments}>{shortTaskComments}</p>
                                <p className={classes.CreatedOn}>{task.createdOn}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>

    );

}
export default Tasklist;