import React from 'react';

import * as classes from './tabs.module.css';
import { Link } from 'react-router-dom';


const Tabs = ({ tabsList, url }) => {

    return (
        <div className={classes.Container}>
            {tabsList.map(tab => {
                return (
                    <Link to={url + tab.url} key={tab.name} style={{ textDecoration: "none" }}>
                        <div className={classes.Tab}>{tab.name}</div>
                    </Link>
                )
            })}
        </div>

    )
}

export default Tabs;