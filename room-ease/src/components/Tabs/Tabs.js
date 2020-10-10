import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import * as classes from './tabs.module.css';

const Tabs = props => {

    let tabsList = [
        'Activity',
        'Tasks',
        'Chat',
        'Room'
    ]

    return (
        <Auxillary className={classes.Container}>
            {tabsList.map(tab => {
                return (
                    <div className={classes.Tab} key={tab}>{tab}</div>
                )
            })}
        </Auxillary>
    )
}

export default Tabs;