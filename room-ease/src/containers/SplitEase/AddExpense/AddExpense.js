import Axios from 'axios';
import { MEMBERS_OF_ROOM_URL, SPLIT_EASE_ADD_EXPENSE } from '../../../constants/ServerRoutes';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextInput from '../../../components/inputs/TextInput';
import MemberSelect from '../../../components/inputs/MemberSelect';
import RegularButton from '../../../components/inputs/RegularButton';
import { connect } from 'react-redux';

class AddExpense extends Component {
    state = {
        expenseDescription: "",
        expenseAmount: "",
        selectedUser: "",
        columns: {
            users: [],
        },
        members: [],
        error: "",
        roomName: null
    }

    fetchAndUpdateUsersOfRoom = async (roomName) => {
        try {
            let url = MEMBERS_OF_ROOM_URL + "?roomname=" + roomName;
            let members = (await Axios.get(url)).data.Members;

            members = members.filter(member => member._id != this.props.userID)

            let selectedUser = members.length > 0 ? members[0].userName : "";

            this.setState({ members, selectedUser: selectedUser, error: "" })
        } catch (err) {
            this.setState({ error: err.message })
        }
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

    expenseValueChangedHandler = (event) => {
        let expenseAmount = event.target.value;
        this.setState({ expenseAmount })
    }

    expenseDescriptionChangedHandler = (event) => {
        this.setState({ expenseDescription: event.target.value })
    }

    submitExpense = async () => {
        let from = this.state.columns.users.map(user => user._id);
        let to = this.props.userID;
        let description = this.state.expenseDescription;
        let value = parseInt(this.state.expenseAmount);

        let addExpenseStatus = (await Axios.post(SPLIT_EASE_ADD_EXPENSE, { from, to, description, value })).data;

        if (addExpenseStatus.Result === "Success") {
            this.props.fetchSplitWiseData(this.props.userID);
        }

    }

    componentDidMount() {
        this.fetchAndUpdateUsersOfRoom(this.props.roomName);
    }

    componentDidUpdate() {
        if (!this.state.roomName)
            this.setState({ roomName: this.props.roomName }, () => this.fetchAndUpdateUsersOfRoom(this.props.roomName))
    }

    render() {

        let members = null;
        if (this.state.roomName && (this.state.members.length > 0 || this.state.columns.users.length > 0)) {
            members = (<MemberSelect
                potentialUsers={this.state.members}
                addToList={this.addToList}
                addedUsers={this.state.columns.users}
                selectedUser={this.state.selectedUser}
                selectUserFromDropdown={this.selectUserFromDropdown}
                removeFromList={this.removeFromList}
            ></MemberSelect>)
        }
        else {
            members = <p>No members in your room</p>
        }

        console.log(this.props);

        return (
            <div>
                <h1>Add Expense</h1>
                <TextInput onChange={this.expenseDescriptionChangedHandler} type="text" hint="Description" value={this.state.expenseDescription} />
                <TextInput onChange={this.expenseValueChangedHandler} type="number" hint="$ Amount" value={this.state.expenseAmount} />
                {members}
                {this.state.columns.users.length > 0 ? <RegularButton text={"Submit Expense"} onClick={this.submitExpense} /> : null}
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        userID: state.userID,
        roomName: state.roomName,
    }
}


export default connect(mapStateToProps)(withRouter(AddExpense));