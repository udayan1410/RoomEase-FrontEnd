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


    let constructMenuItems = () => {
        let menuItems = [];

        let roomName = localStorage.getItem("roomName");

        if (roomName !== "null") {
            menuItems.push({
                image: roomImage,
                text: "My Room",
                link: `/room/${props.roomName}/activity`
            });
        }

        menuItems.push({
            image: splitMoneyImage,
            text: "Split Ease",
            link: URLS.SPLIT_EASE_URL + URLS.SPLIT_EASE_FEED
        });

        menuItems.push({
            image: notesImage,
            text: "Notes",
            link: URLS.NOTES_URL + URLS.VIEW_SELF_NOTES_URL
        });

        if (roomName === "null")
            menuItems.push({
                image: inviteImage,
                text: "Invite / Join",
                link: "/room/join"
            });

        return menuItems;

    }

    return (
        <div className={viewDrawer.join(' ')}>
            <h1>Select an option</h1>
            <ul className={classes.list}>
                {constructMenuItems().map(item =>
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