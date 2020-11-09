import React from 'react';
import * as classes from './navigationdrawer.module.css';
import roomImage from '../../assets/room.png'
import notesImage from '../../assets/notes.png'
import splitMoneyImage from '../../assets/split_money.png'
import inviteImage from '../../assets/invite.png'
import { Link } from 'react-router-dom'

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
            link: "/"
        },
        {
            image: splitMoneyImage,
            text: "Split Money",
            link: "/"
        },
        {
            image: notesImage,
            text: "Notes",
            link: "/notes"
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
                    <Link to={item.link} key={item.text} className={classes.Link}>
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

export default NavigationDrawer;