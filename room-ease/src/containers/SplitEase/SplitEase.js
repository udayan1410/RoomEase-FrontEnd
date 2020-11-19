import React, { Component } from 'react';
import classes from './splitease.module.css';
import { withLayout } from '../../hoc/Layout/withLayout';
import upvote from '../../assets/upvote.png';
import downvote from '../../assets/downvote.png';
import * as SplitEaseServerRoutes from '../../constants/ServerRoutes'
import * as SplitEaseClientRoutes from '../../constants/ClientRoutes'
import Axios from 'axios';
import { connect } from 'react-redux';
import Tabs from '../../components/Tabs/Tabs';
import { Route } from 'react-router-dom'
import SplitEaseFeed from './SplitEaseFeed/SplitEaseFeed';
import SpliteaseExpenses from './SplitEaseExpenses/SplitEaseExpenses';
import Auxillary from '../../hoc/Auxillary';

class SplitEase extends Component {

    state = {
        userID: null,
        totalBalance: null,
    }

    fetchSplitWiseData = async (userID) => {
        let splitWiseModel = (await Axios.get(`${SplitEaseServerRoutes.SPLIT_EASE_GET_TOTAL_BALANCE}?userID=${userID}`));
        let { data: { totalBalance } } = splitWiseModel;
        this.setState({ totalBalance })
    }

    componentDidMount() {
        if (this.props.userID && !this.state.userID)
            this.setState({ userID: this.props.userID }, () => this.fetchSplitWiseData(this.props.userID))
    }

    componentDidUpdate() {
        if (this.props.userID && !this.state.userID)
            this.setState({ userID: this.props.userID }, () => this.fetchSplitWiseData(this.props.userID))
    }

    render() {

        const ROUTES = (<Auxillary>
            <Route path={this.props.match.path + SplitEaseClientRoutes.SPLIT_EASE_FEED} component={SplitEaseFeed} />
            <Route path={this.props.match.path + SplitEaseClientRoutes.SPLIT_EASE_EXPENSE} component={SpliteaseExpenses} />
        </Auxillary>);

        let renderHeader = () => {
            let positive = this.state.totalBalance < 0 ? false : true;
            let SplitWiseStatusTextClasses = [classes.SplitwiseStatusText];
            let splitWiseImage = null;
            let statusText = `You are owed $${this.state.totalBalance}`;

            if (positive) {
                splitWiseImage = upvote;
                SplitWiseStatusTextClasses.push(classes.SplitwiseStatusTextPositive);
            }
            else {
                statusText = `You owe $${this.state.totalBalance}`
                splitWiseImage = downvote
                SplitWiseStatusTextClasses.push(classes.SplitwiseStatusTextNegative);
            }

            return (
                <div className={classes.SplitwiseStatus}>
                    <img src={splitWiseImage} alt="Status" />
                    <div className={classes.SplitwiseHeader}>
                        <p className={classes.SplitwiseText}>Total Balance</p>
                        <p className={SplitWiseStatusTextClasses.join(" ")}>{statusText}</p>
                    </div>
                </div>
            )
        }

        let tabsList = [
            { name: "Feed", url: SplitEaseClientRoutes.SPLIT_EASE_FEED },
            { name: "Expenses", url: SplitEaseClientRoutes.SPLIT_EASE_EXPENSE }
        ]

        return (
            <div className={classes.Container}>
                <Tabs tabsList={tabsList} url={this.props.match.url} />
                <h1>SplitEase</h1>
                {renderHeader()}
                {ROUTES}
            </div>
        )

    }


}

let mapStateToProps = state => {
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps, null)(withLayout(SplitEase));