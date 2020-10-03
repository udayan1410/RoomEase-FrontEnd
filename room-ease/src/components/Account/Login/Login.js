import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegularButton from "../../inputs/RegularButton";
import TextInput from "../../inputs/TextInput";
import * as classes from './login.module.css';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }
    handleEmail = event => {

        this.setState({ email: event.target.value });
    };
    handlePassword = event => {
        this.setState({ password: event.target.value });
    };

    authenticateUser = async () => {
        console.log("Submitted");
        let loginCredentials = { email: this.state.email, password: this.state.password }
        let loginStatus = await axios.post('http://10.0.0.70:8080/login', loginCredentials);
        console.log(loginStatus);
    }

    render() {
        return (
            <div >
                <h1>RoomEase</h1>
                <form className={classes.Form}>
                    <p className={classes.signin}>Sign In</p>
                    <TextInput hint="Enter Email" type="text" onChange={this.handleEmail} />
                    <TextInput hint="Enter Password" type="password" onChange={this.handlePassword} />

                    <RegularButton text="SUBMIT" onClick={this.authenticateUser} />
                    <p className="forgot-password text-right">
                        <Link to="signup">Don't have an account? Signup here</Link>
                    </p>
                </form>
            </div>
        );
    }
}
