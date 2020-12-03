import React, { Component } from 'react';
import { withLayout } from '../../hoc/Layout/withLayout'
import * as classes from './createroom.module.css';
import TextInput from '../../components/inputs/TextInput';
import RegularButton from '../../components/inputs/RegularButton';
import Axios from 'axios';
import { CREATE_ROOM_URL } from '../../constants/ServerRoutes';
import ErrorMessage from '../../components/inputs/ErrorMessage';
import { AUTHENTICATE_USER } from '../../store/Actions/ActionConstants';
import { connect } from 'react-redux';
import { ROOM_URL, ACTIVITY_URL } from '../../constants/ClientRoutes'

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

        if (roomCreateStats.Result === "Success") {

            let userData = {
                _id: this.props.userID,
                roomName: this.state.roomName
            }
            this.props.updateUserData(userData);
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
                <RegularButton onClick={this.createGroupHandler} text="Create Room" disabled={this.state.buttonDisabled} />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserData: (payload) => dispatch({ type: AUTHENTICATE_USER, user: payload })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withLayout(CreateRoom));
