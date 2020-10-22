import React, { Component } from 'react';
import * as classes from './createtask.module.css'
import TextInput from '../../../components/inputs/TextInput';
import { connect } from 'react-redux';
import { MEMBERS_OF_ROOM_URL, TASK_CREATE_URL } from '../../../constants/ServerRoutes';
import { CHECK_AUTH_STATE } from '../../../store/Actions/ActionConstants';
import Axios from 'axios'
import RegularButton from '../../../components/inputs/RegularButton'
import TaskInfoSelect from '../../../components/TaskInfoSelect/TaskInfoSelect';
import TimeInput from '../../../components/inputs/TimeInput';
import MemberSelect from '../../../components/inputs/MemberSelect';

class CreateTask extends Component {

    state = {
        taskName: "",
        comments: "",
        columns: {
            daysOfTheWeek: [],
            timeOfDay: "",
            users: [],
        },
        roomName: null,
        userID: null,
        members: [],
        error: "",
        selectedUser: "",
        timePeriod: "AM",
        hours: "",
        minutes: "",
    }


    fetchAndUpdateUsersOfRoom = async (roomName) => {
        try {
            let url = MEMBERS_OF_ROOM_URL + "?roomname=" + roomName;
            let members = (await Axios.get(url)).data.Members;

            this.setState({ members, selectedUser: members[0].userName })
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    componentDidMount() {
        this.props.checkAuthState();
    }

    componentDidUpdate(prevProps, prevState) {
        let newRoomName = prevProps.roomName ? prevProps.roomName : this.props.roomName;
        let oldRoomName = this.state.roomName;

        if (this.props.userID !== this.state.userID && this.state.userID === null) {
            this.setState({ userID: this.props.userID })
        }

        if (this.state.roomName === null && oldRoomName !== newRoomName) {
            this.setState({ roomName: newRoomName })
            this.fetchAndUpdateUsersOfRoom(newRoomName);
        }
    }

    taskNameChangedHandler = (event, type) => {
        let value = event.target.value;
        this.setState({ taskName: value })
    }

    taskCommentsChangedHandler = (event, type) => {
        let value = event.target.value;
        this.setState({ comments: value })
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

    changedTime = (event, type) => {
        let time = parseInt(event.target.value);
        if (type === "hours") {
            this.setState({ hours: time })
        }
        else {
            this.setState({ minutes: time })
        }
    }

    changedtimePeriod = (event) => {
        this.setState({ timePeriod: event.target.value })
    }

    addToList = (userName) => {
        let columns = { ...this.state.columns };
        let users = [...columns.users];

        let user = this.state.members.filter(member => member.userName === userName)[0];
        users.push(user);

        columns.users = users;

        let members = [...this.state.members];
        members = members.filter(member => member.userName !== userName);

        let selectedUser = members.length > 0 ? members[0].userName : "";

        this.setState({ columns, members, selectedUser });
    }

    removeFromList = (userName) => {
        let columns = { ...this.state.columns };
        let users = [...columns.users];

        let user = users.filter(member => member.userName === userName)[0];

        users = users.filter(member => member.userName !== userName);

        columns.users = users;

        let members = [...this.state.members];
        members.push(user);

        let selectedUser = members[0].userName;

        this.setState({ columns, members, selectedUser });
    }

    selectUserFromDropdown = (event) => {
        let selectedUser = event.target.value
        this.setState({ selectedUser })
    }

    submittedCreateTask = async () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let createdOn = new Date();
        createdOn = `${monthNames[createdOn.getMonth()]} ${createdOn.getDate()} ${createdOn.getFullYear()}`;
        let columns = {};
        columns.daysOfTheWeek = this.state.columns.daysOfTheWeek;
        columns.users = this.state.columns.users;
        columns.timeOfDay = `${this.state.hours}:${this.state.minutes} ${this.state.timePeriod}`

        let taskModel = {
            createdOn: createdOn,
            taskName: this.state.taskName,
            comments: this.state.comments,
            columns: columns,
            roomName: this.state.roomName,
            userID: this.state.userID
        };


        let taskCreationStatus = (await Axios.post(TASK_CREATE_URL, taskModel)).data;
        if (taskCreationStatus.Result === "Success")
            this.props.history.goBack();

        else
            console.log(taskCreationStatus);

    }

    render() {


        return (
            <div className={classes.Form} >
                <h2>Create Task</h2>
                <TextInput onChange={this.taskNameChangedHandler} type="text" hint="Task Name" value={this.state.taskName} />
                <TextInput onChange={this.taskCommentsChangedHandler} type="textarea" hint="Comments" value={this.state.comments} />
                <TaskInfoSelect days={this.state.columns.daysOfTheWeek} daySelected={this.daySelected} />
                <TimeInput
                    changedTime={this.changedTime}
                    timePeriod={this.state.timePeriod}
                    changedtimePeriod={this.changedtimePeriod}
                    hours={`${this.state.hours}`}
                    minutes={`${this.state.minutes}`}
                />
                <MemberSelect
                    potentialUsers={this.state.members}
                    addToList={this.addToList}
                    addedUsers={this.state.columns.users}
                    selectedUser={this.state.selectedUser}
                    selectUserFromDropdown={this.selectUserFromDropdown}
                    removeFromList={this.removeFromList}
                ></MemberSelect>
                <RegularButton text={"Submit"} onClick={this.submittedCreateTask} />
            </div>
        )
    }
}


let mapStateToProps = state => {
    return {
        roomName: state.roomName,
        userID: state.userID
    }
}

let mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch({ type: CHECK_AUTH_STATE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
