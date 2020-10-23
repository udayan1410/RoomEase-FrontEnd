import React from 'react';
import * as classes from './tabs.module.css';
import { Link } from 'react-router-dom';
import { ROOM_ALL_TASKS_URL, ACTIVITY_URL, CHAT_URL } from '../../constants/ClientRoutes';

const Tabs = props => {

    let tabsList = [
        { name: "Activity", url: ACTIVITY_URL },
        { name: "Tasks", url: ROOM_ALL_TASKS_URL },
        { name: "Chat", url: CHAT_URL },
        { name: "Room", url: ROOM_ALL_TASKS_URL },
    ]

    return (
        <div className={classes.Container}>
            {tabsList.map(tab => {
                return (
                    <Link to={props.url + tab.url} key={tab.name} style={{ textDecoration: "none" }}>
                        <div className={classes.Tab}>{tab.name}</div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Tabs;