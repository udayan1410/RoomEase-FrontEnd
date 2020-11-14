import React, { Component } from 'react';
import Axios from 'axios';
import { TASK_URL, MEMBERS_OF_ROOM_URL } from '../../../constants/ServerRoutes';
import { connect } from 'react-redux';
import TextInput from '../../../components/inputs/TextInput';
import * as classes from './edittask.module.css';
import TaskInfoSelect from '../../../components/TaskInfoSelect/TaskInfoSelect'
import TimeInput from '../../../components/inputs/TimeInput';
import MemberSelect from '../../../components/inputs/MemberSelect';
import RegularButton from '../../../components/inputs/RegularButton';

class EditTask extends Component {

    state = {
        taskName: "",
        comments: "",
        columns: {
            daysOfTheWeek: [],
            timeOfDay: "",
            users: [],
        },
        members: [],
        error: "",
        selectedUser: "",
        timePeriod: "AM",
        hours: "",
        minutes: "",
        taskID: null,
        color: "",
        roomName: "",
    }


    getCurrentTask = async () => {

        let taskID = this.props.match.params.taskid;
        let roomName = this.props.match.params.roomName;

        let url = MEMBERS_OF_ROOM_URL + "?roomname=" + roomName;
        let taskModel = (await Axios.get(url)).data;

        let members = taskModel.Members;

        let task = (await Axios.get(`${TASK_URL}?taskid=${taskID}`)).data;
        let TaskModel = task.Task;

        let { taskName, comments, columns, color } = TaskModel;

        let timeOfDay = columns.timeOfDay;
        let timeOfDayFull = timeOfDay.split(" ");
        let hoursAndMinutes = timeOfDayFull[0];
        let timePeriod = timeOfDayFull[1];

        let hours = hoursAndMinutes.split(":")[0];
        let minutes = hoursAndMinutes.split(":")[1];

        let userMap = {};

        for (let user of columns.users)
            userMap[user._id] = user._id;


        members = members.filter(member => userMap[member._id] == null)

        let selectedUser = members.length > 0 ? members[0].userName : "";

        this.setState({
            taskName,
            comments,
            columns,
            members,
            hours,
            minutes,
            timePeriod,
            selectedUser,
            taskID,
            color,
            roomName
        })


    }

    componentDidMount() {
        this.getCurrentTask();
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

        if (daysOfTheWeek.includes(day))
            daysOfTheWeek.splice(daysOfTheWeek.indexOf(day), 1);
        else
            daysOfTheWeek.push(day);

        columns.daysOfTheWeek = daysOfTheWeek;

        this.setState({ columns })
    }

    changedTime = (event, type) => {
        let time = parseInt(event.target.value);
        if (type === "hours")
            this.setState({ hours: time })
        else
            this.setState({ minutes: time })
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

    updatedTask = async () => {
        let columns = {};
        columns.daysOfTheWeek = this.state.columns.daysOfTheWeek;
        columns.users = this.state.columns.users;
        columns.timeOfDay = `${this.state.hours}:${this.state.minutes} ${this.state.timePeriod}`

        let taskModel = {
            taskID: this.state.taskID,
            taskName: this.state.taskName,
            comments: this.state.comments,
            columns: columns,
            roomName: this.state.roomName,
            userID: this.props.userID
        };

        let taskUpdationStatus = (await Axios.patch(TASK_URL, taskModel)).data;
        console.log(taskUpdationStatus);
        this.props.history.goBack();

    }

    deletedTask = async () => {

        let taskDeletionStatus = (await Axios.delete(`${TASK_URL}?task=${this.state.taskID}&roomname=${this.props.match.params.roomName}`));
        console.log(taskDeletionStatus);
        this.props.history.goBack();

    }

    render() {

        return (
            <div className={classes.Form}>
                <h2 style={{ border: `5px solid ${this.state.color}` }}>Update Task : {this.state.taskName}</h2>
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

                <RegularButton text={"Update"} onClick={this.updatedTask} type={"warning"} />
                <RegularButton text={"Delete"} onClick={this.deletedTask} type={"danger"} />
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


export default connect(mapStateToProps, null)(EditTask);