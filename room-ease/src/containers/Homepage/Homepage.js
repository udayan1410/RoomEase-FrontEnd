import React, { Component } from 'react';
import { withLayout } from '../../hoc/Layout/withLayout';
import Tabs from '../../components/Tabs/Tabs';
import classes from './homepage.module.css';
import Tasks from '../Tasks/Tasks';
import Activity from '../Activity/Activity';
import { Route, Switch } from 'react-router-dom'
import { ROOM_ALL_TASKS_URL, ROOM_ONE_TASK_URL, ACTIVITY_URL } from '../../constants/ClientRoutes';
import EditTask from '../../containers/Tasks/EditTask/EditTask';

class Homepage extends Component {

    state = {
        roomName: this.props.match.params.roomName
    }


    render() {
        return (
            <div className={classes.HomePage}>
                <Tabs url={this.props.match.url}></Tabs>
                <Switch>
                    <Route path={ROOM_ONE_TASK_URL} component={EditTask} />
                    <Route path={this.props.match.path + ROOM_ALL_TASKS_URL} component={Tasks} />
                    <Route path={this.props.match.path + ACTIVITY_URL} component={Activity} />
                </Switch>
            </div>
        )
    }

}

export default withLayout(Homepage);