import React, { Component } from 'react';
import * as classes from './createtask.module.css'
import TextInput from '../../components/inputs/TextInput';
import { connect } from 'react-redux';
import { MEMBERS_OF_ROOM_URL } from '../../constants/ServerRoutes';
import { CHECK_AUTH_STATE } from '../../store/Actions/ActionConstants';
import Axios from 'axios'
import RegularButton from '../../components/inputs/RegularButton'

import TaskInfoSelect from '../../components/TaskInfoSelect/TaskInfoSelect';
import TimeInput from '../../components/inputs/TimeInput';
import MemberSelect from '../../components/inputs/MemberSelect';

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
            peopleNames: {
                label: "Assigned To",
                value: [],
            }
        },
        status: "",
        createdOn: "",
        roomName: null,
        userID: null,
        members: [],
        error: "",
        selectedUser: ""
    }


    fetchAndUpdateUsersOfRoom = async (roomName) => {
        try {
            let url = MEMBERS_OF_ROOM_URL + "?roomname=" + roomName;
            let members = (await Axios.get(url)).data.Members;
            console.log(members);
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

    addToList = (userName) => {
        let columns = { ...this.state.columns };
        let peopleNames = { ...columns.peopleNames }
        let value = [...peopleNames.value];

        let user = this.state.members.filter(member => member.userName === userName)[0];
        value.push(user);

        peopleNames.value = value;
        columns.peopleNames = peopleNames;

        let members = [...this.state.members];
        members = members.filter(member => member.userName !== userName);

        let selectedUser = members.length > 0 ? members[0].userName : new String("");

        this.setState({ columns, members, selectedUser });
    }

    removeFromList = (userName) => {
        let columns = { ...this.state.columns };
        let peopleNames = { ...columns.peopleNames }
        let value = [...peopleNames.value];


        let user = value.filter(member => member.userName === userName)[0];

        value = value.filter(member => member.userName !== userName);
        peopleNames.value = value;
        columns.peopleNames = peopleNames;

        let members = [...this.state.members];
        members.push(user);

        let selectedUser = members[0].userName;

        this.setState({ columns, members, selectedUser });
    }

    selectUserFromDropdown = (event) => {
        let selectedUser = event.target.value
        this.setState({ selectedUser })
    }

    render() {
        return (
            <div className={classes.Form} >
                <h2>Create Task</h2>
                <TextInput onChange={this.taskNameChangedHandler} type="text" hint="Task Name" />
                <TextInput onChange={this.taskNameChangedHandler} type="textarea" hint="Comments" />
                <TaskInfoSelect days={this.state.columns.daysOfTheWeek} daySelected={this.daySelected} />
                <TimeInput />
                <MemberSelect
                    potentialUsers={this.state.members}
                    addToList={this.addToList}
                    addedUsers={this.state.columns.peopleNames.value}
                    selectedUser={this.state.selectedUser}
                    selectUserFromDropdown={this.selectUserFromDropdown}
                    removeFromList={this.removeFromList}
                ></MemberSelect>
                <RegularButton text={"Submit"} />
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
