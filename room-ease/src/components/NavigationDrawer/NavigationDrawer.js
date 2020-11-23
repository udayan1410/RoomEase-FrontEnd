import React from 'react';
import * as classes from './navigationdrawer.module.css';
import roomImage from '../../assets/room.png'
import notesImage from '../../assets/notes.png'
import splitMoneyImage from '../../assets/split_money.png'
import inviteImage from '../../assets/invite.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { CHECK_AUTH_STATE } from '../../store/Actions/ActionConstants';
import * as URLS from '../../constants/ClientRoutes';

const NavigationDrawer = props => {

    let viewDrawer = [classes.container]

    if (props.view) {
        viewDrawer.push(classes.ViewContainer);
    }
    else
        viewDrawer.push(classes.HideContainer);

    let menuItems = [
        {
            image: roomImage,
            text: "My Room",
            link: `/room/${props.roomName}/activity`
        },
        {
            image: splitMoneyImage,
            text: "Split Ease",
            link: URLS.SPLIT_EASE_URL + URLS.SPLIT_EASE_FEED
        },
        {
            image: notesImage,
            text: "Notes",
            link: URLS.NOTES_URL + URLS.VIEW_SELF_NOTES_URL
        },
        {
            image: inviteImage,
            text: "Invite / Join",
            link: "/room/join"
        }
    ];

    return (
        <div className={viewDrawer.join(' ')}>
            <h1>Select an option</h1>
            <ul className={classes.list}>
                {menuItems.map(item =>
                    <Link to={item.link} key={item.text} className={classes.Link} onClick={props.closeMenu}>
                        <li className={classes.listItem}>
                            <img src={item.image} className={classes.image} alt={item.text} />
                            <p className={classes.items}>{item.text}</p>
                        </li>
                    </Link>
                )}
            </ul>
        </div >
    )
}

let mapStateToProps = state => {
    return {
        roomName: state.roomName
    }
}

let mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch({ type: CHECK_AUTH_STATE })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);