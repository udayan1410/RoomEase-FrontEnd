import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegularButton from "../../../components/inputs/RegularButton";
import TextInput from "../../../components/inputs/TextInput";
import * as classes from './login.module.css';
import axios from 'axios';
import { LOGIN_URL } from '../../../constants/ServerRoutes';
import { ROOM_URL, ROOM_JOIN_URL, SIGNUP_URL } from '../../../constants/ClientRoutes';
import ErrorMessage from '../../../components/inputs/ErrorMessage';
import { CHECK_AUTH_STATE, AUTHENTICATE_USER } from '../../../store/Actions/ActionConstants';
import { connect } from 'react-redux';



class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        userLoggedIn: false
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    };
    handlePassword = event => {
        this.setState({ password: event.target.value });
    };

    validate = () => {
        if (this.state.email === '' || this.state.password === '')
            this.setState({ error: "Email id/ Password cannot be empty" })
    }

    componentDidMount() {
        this.props.checkAuthState();
    }

    authenticateUser = async () => {
        this.validate();

        let loginCredentials = { email: this.state.email, password: this.state.password }
        let loginStatus = (await axios.post(LOGIN_URL, loginCredentials)).data;

        let { responseObject, user } = loginStatus;

        if (responseObject.Result === "Success") {
            this.props.updateUserData(user);
            this.setState({ error: "" }, () => {
                if (this.props.roomName)
                    this.props.history.push(ROOM_URL + '/' + this.props.roomName);

                else
                    this.props.history.push(ROOM_JOIN_URL);
            })
        }

        else
            this.setState({ error: responseObject.Error })
    }

    render() {

        let erorrMessage = null;

        if (this.state.error)
            erorrMessage = (<ErrorMessage message={this.state.error} />)

        return (
            <div >
                <h1>RoomEase</h1>
                <form className={classes.Form}>
                    <p className={classes.signin}>Sign In</p>
                    <TextInput hint="Enter Email" type="text" onChange={this.handleEmail} />
                    <TextInput hint="Enter Password" type="password" onChange={this.handlePassword} />

                    <RegularButton text="SUBMIT" onClick={this.authenticateUser} />

                    {erorrMessage}
                    <p className="forgot-password text-right">
                        <Link to={SIGNUP_URL}>Don't have an account? Signup here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userID != null,
        roomName: state.roomName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthState: () => dispatch({ type: CHECK_AUTH_STATE }),
        updateUserData: (payload) => dispatch({ type: AUTHENTICATE_USER, user: payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);