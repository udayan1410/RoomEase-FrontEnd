import React, { Component } from 'react';
import * as classes from './userprofile.module.css';
import axios from 'axios';
import { USER_PROFILE_URL } from '../../constants/ServerRoutes';
import { withLayout } from '../../hoc/Layout/withLayout'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomInfo: [],
            userInfo: {},
        }
    }


    componentDidMount() {
        this.hasRoom()
    }

    hasRoom = async () => {

        let userID = localStorage.getItem('userID')
        let roomName = localStorage.getItem('roomName')

        let profileStatus = (await axios.get(USER_PROFILE_URL + "?userID=" + userID + "&roomName=" + roomName)).data;
        // let {Result,Error}= profileStatus
        this.setState({ roomInfo: profileStatus.Members });
        let obj = {}
        obj["Username"] = profileStatus.userInfo.userName;
        obj["Room Name"] = roomName;
        obj["Email id"] = profileStatus.userInfo.email;
        obj["Phone no"] = profileStatus.userInfo.phoneNumber;
        this.setState({ userInfo: obj });

    }

    render() {
        return (
            <div >
                <div className={classes.user}>
                    <div className={classes.userprofilebox}>
                        <img src={require('../../../src/assets/profile.png')} className={classes.profileimg} alt="Profile " />
                    </div>
                    <h3 className={classes.username}>@{this.state.userInfo.Username}</h3>
                </div>

                <div className={classes.userinfo}>
                    {Object.keys(this.state.userInfo).map((key) => {
                        console.log(key);
                        return (
                            <div className={classes.info} key={key}>
                                <h3 className={classes.category}>{key} :</h3>
                                <h4 className={classes.value}>{this.state.userInfo[key]}</h4>
                            </div>
                        )
                    })}

                </div>
            </div>
        );
    }


}

export default withLayout(UserProfile);


