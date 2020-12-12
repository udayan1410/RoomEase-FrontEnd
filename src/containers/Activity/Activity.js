import React, { Component } from 'react';
import * as classes from './activity.module.css';
import Axios from 'axios';
import { ACTIVITY_URL } from '../../constants/ServerRoutes'
import Table from '../../components/Table/Table';

class Activity extends Component {

    state = {
        roomName: this.props.match.params.roomName,
        feed: [],
    }

    headers = ['No.', 'Status', 'Date'];

    fetchFeed = async () => {
        let feed = (await Axios.get(`${ACTIVITY_URL}?roomname=${this.state.roomName}`)).data.Feed;
        this.setState({ feed })
    }

    componentDidMount() {
        this.fetchFeed();
    }

    render() {

        return (
            <div className={classes.Container}>
                <h1>{this.state.feed.length === 1 ? "Activity" : "Activities"} of room {this.state.roomName}</h1>
                <Table headers={this.headers} tableData={this.state.feed}></Table>
            </div>
        )
    }
}

export default Activity;