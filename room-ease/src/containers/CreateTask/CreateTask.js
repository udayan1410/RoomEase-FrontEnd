import React, { Component } from 'react';
import * as classes from './createtask.module.css'
import TextInput from '../../components/inputs/TextInput';
import { connect } from 'react-redux';
import { MEMBERS_OF_ROOM_URL } from '../../constants/ServerRoutes';
import { CHECK_AUTH_STATE } from '../../store/Actions/ActionConstants';
import Axios from 'axios'

import TaskInfoSelect from '../../components/TaskInfoSelect/TaskInfoSelect';
import TimeInput from '../../components/inputs/TimeInput';

class CreateTask extends Component {

    state = {
        taskName: "",
        comments: "",
        columns: {
            daysOfTheWeek: [],
            timeOfDay: {
                label: "Time of day",
                value: "",
            },
            peopleName: {
                label: "Assigned To",
                value: [],
                ids: [],
            }
        },
        status: "",
        createdOn: "",
        roomName: null,
        members: [],
        error: "",
    }


    fetchAndUpdateUsersOfRoom = async (roomName) => {
        try {
            let url = MEMBERS_OF_ROOM_URL + "?roomname=" + roomName;
            let members = (await Axios.get(url)).data.Members;
            this.setState({ members })
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    componentDidMount() {
        this.props.checkAuthState();
    }

    componentDidUpdate(prevProps, prevState) {
        let newRoomName = prevProps.roomName;
        let oldRoomName = this.state.roomName;

        if (this.state.roomName === null && oldRoomName !== newRoomName) {
            this.setState({ roomName: newRoomName })
            this.fetchAndUpdateUsersOfRoom(newRoomName);
        }
    }

    taskNameChangedHandler = (day) => {

    }

    daySelected = (day) => {
        let columns = { ...this.state.columns };
        let daysOfTheWeek = [...columns.daysOfTheWeek];

        if (daysOfTheWeek.includes(day)) {
            daysOfTheWeek.splice(daysOfTheWeek.indexOf(day), 1);
        }
        else {
            daysOfTheWeek.push(day);
        }
        columns.daysOfTheWeek = daysOfTheWeek;

        this.setState({ columns })

    }

    render() {
        return (
            <div className={classes.Form} >
                <h2>Create Task</h2>
                <TextInput onChange={this.taskNameChangedHandler} type="text" hint="Task Name" />
                <TextInput onChange={this.taskNameChangedHandler} type="textarea" hint="Comments" />
                <TaskInfoSelect days={this.state.columns.daysOfTheWeek} daySelected={this.daySelected} />
                <TimeInput />
            </div>
        )
    }
}


let mapStateToProps = state => {
    return {
        roomName: state.roomName
    }
}

let mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch({ type: CHECK_AUTH_STATE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
