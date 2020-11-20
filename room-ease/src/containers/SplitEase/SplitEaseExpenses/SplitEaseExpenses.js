import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SplitEaseServerRoutes from '../../../constants/ServerRoutes'
import Axios from 'axios';
import userIcon from '../../../assets/profile.png';
import * as classes from './splitexpenses.module.css'

class SpliteaseExpenses extends Component {
    state = {
        userID: null,
        expenses: [],
    }

    fetchExpenses = async (userID) => {
        let { balanceMap } = (await Axios.get(`${SplitEaseServerRoutes.SPLIT_EASE_GET_EXPENSES}?userID=${userID}`)).data;

        let expenses = [];

        for (let balance in balanceMap) {
            let expenseObj = {
                userName: balanceMap[balance].userName,
                id: balanceMap[balance]._id,
                balance: balanceMap[balance].balance,
            };

            expenses.push(expenseObj);
        }

        this.setState({ expenses })

    }

    settleUpExpense = async (from, balance) => {
        let to = this.state.userID;

        let paybackExpenseObj = {
            to: to,
            from: from,
            description: "",
            value: balance
        }

        let settleUpResponse = (await Axios.post(SplitEaseServerRoutes.SPLIT_EASE_SETTLE_IP, paybackExpenseObj)).data;
        if (settleUpResponse.Result === "Success") {
            this.fetchExpenses(to);
            this.props.fetchSplitWiseData(this.props.userID);
        }


    }

    componentDidMount() {
        if (this.props.userID && !this.state.userID)
            this.setState({ userID: this.props.userID }, () => this.fetchExpenses(this.props.userID))
    }

    componentDidUpdate() {
        if (this.props.userID && !this.state.userID)
            this.setState({ userID: this.props.userID }, () => this.fetchExpenses(this.props.userID))
    }


    render() {
        let renderUserExpenseList = () => {

            let expenses = [...this.state.expenses];

            let list = (
                <div>
                    {expenses.map(expense => {

                        let { id, userName, balance } = expense;

                        let balanceMessage = "All Settled up";
                        let userBalance = null;
                        let totalBalanceDisplayClasses = classes.TotalBalanceDisplayRegular;

                        let settleUpObj = {
                            message: "Settle Up",
                            settleUpExpense: this.settleUpExpense,
                            balance: Math.abs(balance),
                            getBody: function () {
                                return (
                                    <div className={classes.settleUp} onClick={() => this.settleUpExpense(id, this.balance)}>
                                        <p className={classes.settleUpMessage}>{this.message}</p>
                                    </div>
                                )
                            },
                            show: false,
                        };

                        if (balance > 0) {
                            userBalance = <p className={classes.userBalance}>$ {balance}</p>
                            balanceMessage = "Owes You"
                            totalBalanceDisplayClasses = classes.TotalBalanceDisplayPositive;
                        }
                        else if (balance < 0) {
                            settleUpObj.show = true;

                            balance = Math.abs(balance);
                            userBalance = <p className={classes.userBalance}>$ {balance}</p>
                            balanceMessage = "You Owe"
                            totalBalanceDisplayClasses = classes.TotalBalanceDisplayNegative;
                        }


                        return (
                            <div key={id} className={classes.ExpenseContainer}>
                                <div className={classes.UserExpense} >
                                    <div className={classes.userProfile}><img src={userIcon} alt={"Profile Icon"}></img></div>
                                    <p className={classes.userName}>{userName}</p>
                                    <div className={totalBalanceDisplayClasses}>
                                        <p className={classes.balanceMessage}>{balanceMessage}</p>
                                        {userBalance}
                                    </div>
                                </div>
                                {settleUpObj.show ? settleUpObj.getBody() : null}
                            </div>
                        )
                    })
                    }
                </div>
            );

            return list;
        }

        return (
            <div>
                {renderUserExpenseList()}
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps, null)(SpliteaseExpenses);