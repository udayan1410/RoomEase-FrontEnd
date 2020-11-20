import React, { Component } from 'react';
import * as SplitEaseServerRoutes from '../../../constants/ServerRoutes'
import Axios from 'axios';
import { connect } from 'react-redux';
import Auxillary from '../../../hoc/Auxillary';
import classes from './spliteasefeed.module.css';
import Backdrop from '../../../components/Backdrop/Backdrop';
import Modal from '../../../components/Modal/Modal';
import RegularButton from '../../../components/inputs/RegularButton';

class SplitEaseFeed extends Component {

    state = {
        userID: null,
        feed: [],
        modalOpen: false,
        currentExpense: null,
        expenseData: null,
    }


    modalToggle = async (id) => {
        let modalOpen = !this.state.modalOpen

        if (typeof id !== "string")
            this.setState({ currentExpense: null });

        else
            this.setState({ currentExpense: this.state.feed.filter(f => f._id === id)[0] });

        if (modalOpen) {
            // console.log(id);
            let expenseData = (await Axios.get(`${SplitEaseServerRoutes.SPLIT_EASE_GET_EXPENSE_DETAILS}?expenseID=${id}`)).data.data;
            this.setState({ expenseData: expenseData })

         if (expenseData.expenseType !== "payback")

                this.setState({ modalOpen })
        }
        else
            this.setState({ modalOpen })

    }

    fetchFeedData = async (userID) => {
        let splitWiseFeedModel = (await Axios.get(`${SplitEaseServerRoutes.SPLIT_EASE_GET_EXPENSE_FEED}?userID=${userID}`));
        let { data: { feed } } = splitWiseFeedModel;
        // console.log(feed);
        this.setState({ feed })

    }

    componentDidMount() {
        if (this.props.userID && !this.state.userID) {
            // console.log("In if mount");
            this.setState({ userID: this.props.userID }, () => this.fetchFeedData(this.props.userID))
        }
    }

    componentDidUpdate() {
        if (this.props.userID && !this.state.userID) {
            // console.log("In if update");
            this.setState({ userID: this.props.userID }, () => this.fetchFeedData(this.props.userID))
        }
    }

    render() {

        let renderList = () => {
            let list = (
                <div className={classes.FeedList}>
                    {this.state.feed.map(activity => {
                        let note = activity.description;
                        let DescriptionClasses = [classes.Subheading, note.includes("You") ? classes.SubheadingSuccess : classes.SubheadingWarning];

                        return (
                            <div className={classes.FeedContainer} key={activity._id} onClick={() => this.modalToggle(activity.expenseID)}>
                                <div className={classes.TotalValue}>
                                    <div className={classes.ValueCircle}>{activity.value}$</div>
                                </div>
                                <div className={classes.Feed}>
                                    <p className={classes.Description}>{activity.description}</p>
                                    <p className={DescriptionClasses.join(" ")}>{activity.subheading}</p>
                                    <p className={classes.Date}>{activity.date}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>);

            return list;
        }

        let modal = null;


        //All the code will be executed only if modal is open
        if (this.state.modalOpen) {
            let expenseData = this.state.expenseData;
            let { description, to: { userName, _id }, eachContribution, from, deleted, expenseType } = expenseData;
            let totalCost = `$ ${(eachContribution * (from.length + 1)).toFixed(2)}`;
            let totalOwedToMe = (eachContribution * (from.length)).toFixed(2);
            let showDeleteButton = false;

            if (_id === this.props.userID) {
                userName = `You (${userName})`;

                if (expenseType === "expense")
                    showDeleteButton = true;
            }

            let expenseHeader = `${userName} ${deleted ? "deleted expense" : "added"} ${description}`;

            let deleteButton = null;
            if (showDeleteButton) {
                deleteButton = (<RegularButton
                    text="Delete"
                    disabled={deleted}
                    onClick={async () => {
                        let deleteStatus = (await Axios.delete(`${SplitEaseServerRoutes.SPLIT_EASE_REMOVE_EXPENSE}?expenseID=${expenseData._id}`)).data;
                        // console.log(deleteStatus);
                        if (deleteStatus.Result === "Success") {
                            this.modalToggle();
                        }
                    }}
                />
                );
            }

            modal = (
                <Auxillary>
                    <Backdrop
                        show={this.state.modalOpen}
                        onClick={this.modalToggle}
                    />

                    <Modal>
                        <div className={classes.ModalHeader}>
                            <p className={classes.ExpenseHeader}>{expenseHeader}</p>
                            <p className={classes.TotalCost}>{totalCost}</p>
                        </div>
                        <div className={classes.ModalBody}>
                            <p className={classes.ValueBreakdown}> <b>{userName}</b> paid <b>{totalCost}</b> and is owed <b>${totalOwedToMe}</b></p>
                            {from.map(f => {
                                return (
                                    <p className={classes.ValueBreakdown} key={f._id}> <b>{f.userName}</b> owes <b>${eachContribution}</b></p>
                                )
                            })}
                            {deleteButton}
                        </div>
                    </Modal>
                </Auxillary>
            )
        }


        return (
            <Auxillary>
                {renderList()}
                {modal}
            </Auxillary>
        );
    }
}


let mapStateToProps = state => {
    return {
        userID: state.userID
    }
}


export default connect(mapStateToProps, null)(SplitEaseFeed);