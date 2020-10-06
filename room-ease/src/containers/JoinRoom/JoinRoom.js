import React, { Component } from 'react';
import RegularButton from "../../components/inputs/RegularButton";
import TextInput from "../../components/inputs/TextInput";
import * as classes from './joinroom.module.css';
import axios from 'axios';
import { JOIN_ROOM_URL } from '../../constants/ServerRoutes';
import Layout from '../../hoc/Layout/Layout'

class JoinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            userID: '',
            error: ''
        };
    }
    handleRoomName = event => {
        this.setState({ roomName: event.target.value });
    }
    authenticateRoom = async () => {
        let loginCredentials = { userID: this.state.userID, roomName: this.state.roomName }
        let loginStatus = (await axios.post(JOIN_ROOM_URL, loginCredentials)).data;
        let { Result, Error } = loginStatus;
    }
    render() {
        let errorMessage = null;
        if (this.state.error)
            errorMessage = (<p className={classes.error}>{this.state.error}</p>)

        return (
            <Layout>
                <h1>RoomEase</h1>
                <div className={classes.div}>
                    <p> Join Room </p>
                    <TextInput hint="Enter room name" type="text" onChange={this.handleRoomName} ></TextInput>
                    <RegularButton disabled={this.state.roomName} text="Join" onClick={this.authenticateRoom}></RegularButton>
                    <h3> OR</h3>
                    <RegularButton text="Creat a room" onClick={this.createRoom}></RegularButton>
                </div>
            </Layout>
        );


    }
}


export default JoinRoom;

