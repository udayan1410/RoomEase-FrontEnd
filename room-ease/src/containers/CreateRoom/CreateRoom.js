import React, { Component } from 'react';
import { withLayout } from '../../hoc/Layout/withLayout'
import * as classes from './createroom.module.css';
import TextInput from '../../components/inputs/TextInput';
import RegularButton from '../../components/inputs/RegularButton';
import Axios from 'axios';
import { CREATE_ROOM_URL } from '../../constants/ServerRoutes';
import ErrorMessage from '../../components/inputs/ErrorMessage';
import { connect } from 'react-redux';
import { ROOM_URL, ACTIVITY_URL } from '../../constants/ClientRoutes';

class CreateRoom extends Component {

    state = {
        roomName: null,
        buttonDisabled: true,
        error: null,
    }

    roomNameChangedHandler = (event) => {
        let roomName = event.target.value;
        let buttonDisabled = true;
        if (roomName.length >= 3)
            buttonDisabled = false;

        this.setState({ roomName, buttonDisabled })
    }

    createGroupHandler = async () => {
        let RoomInfo = {
            userID: this.props.userID,
            roomName: this.state.roomName
        }

        let roomCreateStats = (await Axios.post(CREATE_ROOM_URL, RoomInfo)).data;
        console.log(roomCreateStats);
        if (roomCreateStats.Result === "Success") {
            this.props.history.push(`${ROOM_URL}/${this.state.roomName}${ACTIVITY_URL}`)
        }


        else {
            let error = roomCreateStats.Error;
            console.log(error);
            this.setState({ error: error })
        }
    }

    render() {

        let errorMessage = null;
        if (this.state.error)
            errorMessage = (<ErrorMessage message={this.state.error} />)

        return (
            <form className={classes.Form}>
                <p>Create Room</p>
                <TextInput hint="Enter Group Name" onChange={this.roomNameChangedHandler} />
                {errorMessage}
                <RegularButton onClick={this.createGroupHandler} text="Create Group" disabled={this.state.buttonDisabled} />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}


export default connect(mapStateToProps, null)(withLayout(CreateRoom));