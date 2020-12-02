import React, { Component } from 'react';
import * as classes from './room.module.css';
import TextInput from '../../components/inputs/TextInput';
import RegularButton from '../../components/inputs/RegularButton';
import { connect } from 'react-redux';
import { CHECK_AUTH_STATE, CLEAR_USER_ROOM } from '../../store/Actions/ActionConstants'
import Axios from 'axios'
import { LEAVE_ROOM_URL, ROOM_ADD_URL, MEMBERS_OF_ROOM_URL } from '../../constants/ServerRoutes'
import { ROOM_JOIN_URL } from '../../constants/ClientRoutes'
import ErrorMessage from '../../components/inputs/ErrorMessage';

import Snackbar from '../../components/inputs/Snackbar';

class Room extends Component {
    state = {
        userToAdd: "",
        error: "",
        snackbarMessage: "",
        roomMembers: []
    }


    leaveRoomHandler = async () => {
        let { userID, roomName } = this.props
        let obj = { userID: userID, roomName: roomName };
        let leaveRoomStats = (await Axios.post(LEAVE_ROOM_URL, obj)).data;
        if (leaveRoomStats.Result === "Success") {
            this.props.clearUserRoom();
            this.props.history.push(ROOM_JOIN_URL);
        }
        else
            console.log("Something went wrong");

    }

    addUserToRoomHandler = async () => {
        let roomName = this.props.roomName;
        let userName = this.state.userToAdd;

        if (userName.toString().length === 0) {
            this.setState({ error: "Username cannot be empty" })
            return
        }

        let addUserToRoomResponse = (await Axios.post(ROOM_ADD_URL, { userName: userName, roomName: roomName })).data;

        if (addUserToRoomResponse['Result'] === "Success") {
            this.setState({ snackbarMessage: "User Added Successfully" })
        } else {
            this.setState({ error: addUserToRoomResponse['Error'] })
        }
    }

    onUserChangedHandler = (event) => {
        this.setState({ userToAdd: event.target.value })
    }

    getAllMembers = async () => {
        let roomName = this.props.match.params.roomName
        let roomMembers = (await Axios.get(`${MEMBERS_OF_ROOM_URL}?roomname=${roomName}`)).data;

        if (roomMembers.Result === "Success") {
            this.setState({ roomMembers: roomMembers.Members })
        } else {
            console.log("Something went wrong while fetching");
        }


    }

    componentDidMount() {
        this.getAllMembers();
    }

    render() {
        let button = null;

        if (this.props.userID != null) {
            button = (<input
                value="Leave Room"
                type="button"
                className={classes.LeaveRoomButton}
                onClick={this.leaveRoomHandler}
            />)
        }

        let roomName = "";

        if (this.props.roomName)
            roomName = this.props.roomName;


        let parseAndRenderRoommates = () => {
            if (this.state.roomMembers.length > 0) {
                let roomMatesList = (
                    <div className={classes.RoomMembers}>
                        {this.state.roomMembers.map(roomMember => {
                            return (
                                <div key={roomMember._id} className={classes.MemberBox}>
                                    <p>Name : <b>{roomMember.userName}</b></p>
                                    <p>Email : <b>{roomMember.email}</b></p>
                                </div>
                            )
                        })}
                    </div>
                );
                return roomMatesList;
            }
            else return null;
        }

        return (
            <div className={classes.Container}>
                <div className={classes.LeaveRoom}>
                    <h1>Room: <u>{roomName}</u></h1>
                    {button}
                </div>
                <div className={classes.Add}>
                    <TextInput
                        hint={"Enter Username to add to room"}
                        value={this.state.userToAdd}
                        onChange={this.onUserChangedHandler}
                    />
                    <ErrorMessage message={this.state.error} />
                    <Snackbar message={this.state.snackbarMessage} hideMessage={() => this.setState({ snackbarMessage: "" })} />
                    <RegularButton
                        text="Add"
                        onClick={this.addUserToRoomHandler}
                    />
                </div>
                <h2>Your Roomies</h2>
                {parseAndRenderRoommates()}
            </div>
        )
    }
}


let mapStateToProps = state => {
    return {
        roomName: state.roomName,
        userID: state.userID,
    }
}

let mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch({ type: CHECK_AUTH_STATE }),
        clearUserRoom: () => dispatch({ type: CLEAR_USER_ROOM }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
