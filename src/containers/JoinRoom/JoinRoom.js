import React, { Component } from 'react';
import RegularButton from "../../components/inputs/RegularButton";
import TextInput from "../../components/inputs/TextInput";
import * as classes from './joinroom.module.css';
import axios from 'axios';
import { JOIN_ROOM_URL } from '../../constants/ServerRoutes';
import { ROOM_CREATE_URL, ROOM_URL, ACTIVITY_URL } from '../../constants/ClientRoutes';
import { connect } from 'react-redux';
import { AUTHENTICATE_USER } from '../../store/Actions/ActionConstants'
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
        let loginCredentials = { userID: localStorage.getItem('userID'), roomName: this.state.roomName }
        let loginStatus = (await axios.post(JOIN_ROOM_URL, loginCredentials)).data;

        if (loginStatus.Result === 'Success') {
            this.props.saveDataToRedux({ _id: this.props.userID, roomName: this.state.roomName });
            this.setState({ error: 'Added to room' })
            this.props.history.push(`${ROOM_URL}/${this.state.roomName}${ACTIVITY_URL}`);
        }

        else
            this.setState({ error: loginStatus.Error })
    }

    createRoom = () => {
        this.props.history.push(ROOM_CREATE_URL);
    }

    render() {
        let errorMessage = null;
        if (this.state.error)
            errorMessage = (<p className={classes.error}>{this.state.error}</p>)

        let joinRoommButton = null;

        if (this.props.userID)
            joinRoommButton = (<RegularButton disabled={this.state.roomName ? false : true} text="Join" onClick={this.authenticateRoom}></RegularButton>);


        return (
            <div>
                <h1>RoomEase</h1>
                <div className={classes.div}>
                    <p> Join Room </p>
                    <TextInput hint="Enter room name" type="text" onChange={this.handleRoomName} ></TextInput>
                    {joinRoommButton}
                    {errorMessage}
                    <h3> OR</h3>
                    <RegularButton text="Create a room" onClick={this.createRoom}></RegularButton>
                </div>
            </div>
        );


    }
}


let mapStateToProps = state => {
    return {
        userID: state.userID
    };
}


let mapDispatchToProps = dispatch => {
    return {
        saveDataToRedux: (payload) => dispatch({ type: AUTHENTICATE_USER, user: payload })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withLayout(JoinRoom));

