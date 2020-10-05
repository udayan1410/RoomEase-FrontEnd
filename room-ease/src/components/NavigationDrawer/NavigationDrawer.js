import React from 'react';
import * as classes from './navigationdrawer.module.css';
import roomImage from '../../assets/room.png'
import notesImage from '../../assets/notes.png'
import splitMoneyImage from '../../assets/split_money.png'
import inviteImage from '../../assets/invite.png'

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
            text: "My Room"
        },
        {
            image: splitMoneyImage,
            text: "Split Money"
        },
        {
            image: notesImage,
            text: "Notes"
        },
        {
            image: inviteImage,
            text: "Invite / Join"
        }
    ];

    return (
        <div className={viewDrawer.join(' ')}>
            <h1>Select an option</h1>
            <ul className={classes.list}>
                {menuItems.map(item => <li key={item.text} className={classes.listItem}>
                    <img src={item.image} className={classes.image} />
                    <p className={classes.items}>{item.text}</p>
                </li>)}

            </ul>
        </div>
    )

}

export default NavigationDrawer;