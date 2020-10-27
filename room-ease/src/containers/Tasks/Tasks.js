import React, { Component } from 'react';
import * as classes from './tasks.module.css';
import Axios from 'axios';
import { TASKS_OF_ROOM_URL } from '../../constants/ServerRoutes';
import Tasklist from '../../components/TaskList/Tasklist';
import { Link } from 'react-router-dom';
import { TASK_CREATE_URL } from '../../constants/ClientRoutes';
import addIcon from '../../assets/addIcon.png';

class Tasks extends Component {

    state = {
        roomName: this.props.match.params.roomName,
        tasks: [],
    }

    getAllTasks = async () => {
        try {
            let tasksStatus = await Axios.get(`${TASKS_OF_ROOM_URL}?roomname=${this.state.roomName}`)

            let TaskModel = tasksStatus.data.retObj;
            let tasks = TaskModel.tasks;
            this.setState({ tasks });
        }
        catch (err) {
            console.log("[TASKS.js] Something went wrong ", err);
        }
    }

    componentDidMount() {
        this.getAllTasks();
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Header}>
                    <h1>All Tasks of {this.state.roomName}</h1>
                    <Link to={TASK_CREATE_URL} style={{ textDecoration: "none" }}>
                        <img src={addIcon} alt={"Add task"} className={classes.Icon} />
                    </Link>
                </div>
                <Tasklist tasks={this.state.tasks} roomName={this.state.roomName} />
            </div>
        )
    }
}

export default Tasks;