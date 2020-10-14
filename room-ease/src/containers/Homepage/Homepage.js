import React, { Component } from 'react';
import { withLayout } from '../../hoc/Layout/withLayout';
import Tabs from '../../components/Tabs/Tabs';
import classes from './homepage.module.css';

class Homepage extends Component {

    state = {
        roomName: this.props.match.params.roomName
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={classes.HomePage}>
                <Tabs></Tabs>
            </div>
        )
    }

}

export default withLayout(Homepage);