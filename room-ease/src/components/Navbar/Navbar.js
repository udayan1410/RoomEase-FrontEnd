import React from 'react';
import * as classes from './navbar.module.css';
import hamburgerIcon from '../../assets/drawerToggle.png';
import profileIcon from '../../assets/profile.png';

const Navbar = props => {
    return (
        <div className={classes.header}>
            <img
                className={classes.hamburger}
                src={hamburgerIcon}
                alt={"drawer"}
                onClick={props.onDrawerClick}
            ></img>
            <p className={classes.title}>RoomEase</p>
            <img className={classes.profileIcon} src={profileIcon} alt={"profile"}></img>
        </div>
    )
}

export default Navbar;

