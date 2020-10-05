import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegularButton from "../../../components/inputs/RegularButton";
import TextInput from "../../../components/inputs/TextInput";
import * as classes from './login.module.css';
import axios from 'axios';
import { LOGIN_URL } from '../../../constants/ServerRoutes';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    };
    handlePassword = event => {
        this.setState({ password: event.target.value });
    };

    validate = () => {
        if (this.state.email === '' || this.state.password === '')
            return false
        return true
    }

    authenticateUser = async () => {
        if(this.validate()){
        let loginCredentials = { email: this.state.email, password: this.state.password }
        let loginStatus = (await axios.post(LOGIN_URL, loginCredentials)).data;

        let { responseObject, user } = loginStatus;

        if (responseObject.Result === "Success")
            this.setState({ error: "" })

        else
            this.setState({ error: responseObject.Error })
        }
        else
        this.setState({ error: "Email id/ Password cannot be empty" })
    }

    render() {

        let erorrMessage = null;

        if (this.state.error)
            erorrMessage = (<p className={classes.error}>{this.state.error}</p>)


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
                        <Link to="signup">Don't have an account? Signup here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;