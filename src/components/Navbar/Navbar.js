import React from 'react';
import * as classes from './navbar.module.css';
import hamburgerIcon from '../../assets/drawerToggle.png';
import profileIcon from '../../assets/profile.png';

const Navbar = props => {

    let profileClasses = [classes.profileIcon];

    if (props.profileMenuview) {
        profileClasses.push(classes.HighlightProfile);
    }

    return (
        <div className={classes.header}>
            <img
                className={classes.hamburger}
                src={hamburgerIcon}
                alt={"drawer"}
                onClick={props.onDrawerClick}
            ></img>
            <p className={classes.title}>RoomEase</p>
            <img
                className={profileClasses.join(' ')}
                src={profileIcon}
                alt={"profile"}
                onClick={props.onProfileClick}
            ></img>
        </div>
    )
}

export default Navbar;

