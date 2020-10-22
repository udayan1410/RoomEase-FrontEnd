import React, { Component } from 'react';
import RegularButton from "../../components/inputs/RegularButton";
import TextInput from "../../components/inputs/TextInput";
import * as classes from './joinroom.module.css';
import axios from 'axios';
import { JOIN_ROOM_URL } from '../../constants/ServerRoutes';
import { ROOM_CREATE_URL } from '../../constants/ClientRoutes';
import { withLayout } from '../../hoc/Layout/withLayout'

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
        console.log("roomname: ", this.state.roomName)
        let loginCredentials = { userID: '5f79657944f5f348ac09d781', roomName: this.state.roomName }
        let loginStatus = (await axios.post(JOIN_ROOM_URL, loginCredentials)).data;
        if (loginStatus.Result === 'Success')
            this.setState({ error: 'Added to room' })
        else
            this.setState({ error: loginStatus.Error })
        console.log("login", loginStatus)
        // let { Result, Error } = loginStatus;
    }

    createRoom = () => {
        this.props.history.push(ROOM_CREATE_URL);
    }

    render() {
        let errorMessage = null;
        if (this.state.error)
            errorMessage = (<p className={classes.error}>{this.state.error}</p>)

        return (
            <div>
                <h1>RoomEase</h1>
                <div className={classes.div}>
                    <p> Join Room </p>
                    <TextInput hint="Enter room name" type="text" onChange={this.handleRoomName} ></TextInput>
                    <RegularButton disabled={this.state.roomName ? false : true} text="Join" onClick={this.authenticateRoom}></RegularButton>
                    {errorMessage}
                    <h3> OR</h3>
                    <RegularButton text="Create a room" onClick={this.createRoom}></RegularButton>
                </div>
            </div>
        );


    }
}



export default withLayout(JoinRoom);

