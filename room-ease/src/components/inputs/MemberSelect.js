
import React from 'react';
import * as classes from './memberselect.module.css';
import redCross from '../../assets/cross.png';
import addIcon from '../../assets/addIcon.png';

const MemberSelect = props => {

    return (
        <div>
            <div className={classes.Container}>
                <select onChange={props.selectUserFromDropdown} value={props.selectedUser}>
                    {props.potentialUsers.map(user => <option key={user._id} value={user.userName}>{user.userName}</option>)}
                </select>
                {props.potentialUsers.length > 0 ? <img src={addIcon} alt="Add" className={classes.Icon} onClick={() => props.addToList(props.selectedUser)} /> : null}
            </div>
            {props.addedUsers.map(user => {
                return (
                    <div key={user._id} className={classes.Container}>
                        <p>{user.userName}</p>
                        <img className={classes.Icon} src={redCross} onClick={() => props.removeFromList(user.userName)} alt="Remove" />
                    </div>
                )
            })}

        </div>
    );

}

export default MemberSelect;

