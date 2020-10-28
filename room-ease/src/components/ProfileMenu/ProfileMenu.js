import React from 'react';
import * as classes from './profilemenu.module.css';
import { connect } from 'react-redux';
import { LOGOUT_USER } from '../../store/Actions/ActionConstants';
import logoutIcon from '../../assets/logout.png'
import profileIcon from '../../assets/p1.png'
import { withRouter } from 'react-router-dom'
import { LOGIN_URL, USER_PROFILE_URL } from '../../constants/ClientRoutes';

const ProfileMenu = props => {

    let stylingClasses = [classes.Menu];

    if (props.view)
        stylingClasses.push(classes.MenuShow)

    else
        stylingClasses.push(classes.MenuHide)

    let menuItems = [
        {
            text: "View Profile",
            image: profileIcon,
            link: USER_PROFILE_URL
        },
        {
            text: "Logout",
            image: logoutIcon,
            link: LOGIN_URL
        },
        
    ]

    let redirectFunction = (link) => {
        if (link === LOGIN_URL) {
            props.logoutUser();
            props.history.push(LOGIN_URL)
        }
        if(link === USER_PROFILE_URL){
            props.history.push(USER_PROFILE_URL)
        }

    }

    return (

        <div className={stylingClasses.join(' ')}>
            <ul className={classes.list}>
                {menuItems.map(item =>
                    <li className={classes.listItem} key={item.text} onClick={() => redirectFunction(item.link)}>
                        <img src={item.image} className={classes.image} alt={item.text} />
                        <p className={classes.items}>{item.text}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}


let mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
}


export default connect(null, mapDispatchToProps)(withRouter(ProfileMenu));