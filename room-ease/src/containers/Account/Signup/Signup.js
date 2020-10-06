import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import RegularButton from "../../../components/inputs/RegularButton";
import TextInput from "../../../components/inputs/TextInput";
import * as classes from './signup.module.css';
import axios from 'axios';
import { SIGNUP_URL } from '../../../constants/ServerRoutes';
import ErrorMessage from "../../../components/inputs/ErrorMessage";


class SignUp extends Component {

  state = {
    email: '',
    userName: '',
    password: '',
    FirstName: '',
    phoneNumber: '',
    error: ''
  };

  handleEmail = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleFirstName = event => {
    this.setState({ FirstName: event.target.value });
  };
  handlephoneNumber = event => {
    this.setState({ phoneNumber: event.target.value });
  };
  handleUserName = event => {
    this.setState({ userName: event.target.value });
  };
  validate = () => {
    if (this.state.email === '' || this.state.FirstName === '' || this.state.phoneNumber === '' || this.state.userName === '' || this.state.password === '')
      this.setState({ error: "Email id/ Password cannot be empty" })
  }
  authenticateUser = async () => {

    try {
      this.validate();

      let loginCredentials = { userName: this.state.userName, phoneNumber: this.state.phoneNumber, email: this.state.email, password: this.state.password }
      let loginStatus = (await axios.post(SIGNUP_URL, loginCredentials)).data;
      let { Result, Error } = loginStatus;

      if (Result === "Success") {
        this.setState({ error: "Success" })
        this.props.history.goBack();
      }
      else
        this.setState({ error: Error })
    }
    catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    let erorrMessage = null;

    if (this.state.error)
      erorrMessage = (<ErrorMessage message={this.state.error} />)

    return (
      <div >
        <h1>RoomEase</h1>
        <form className={classes.Form}>
          <p className={classes.signup}>Sign Up</p>
          <TextInput hint="Enter Name" type="text" onChange={this.handleFirstName} />
          <TextInput hint="Phone Number" type="number" onChange={this.handlephoneNumber} />
          <TextInput hint="Enter Email" type="email" onChange={this.handleEmail} />
          <TextInput hint="Enter Username" type="text" onChange={this.handleUserName} />
          <TextInput hint="Enter Password" type="password" onChange={this.handlePassword} />

          <RegularButton text="SUBMIT" onClick={this.authenticateUser} />

          {erorrMessage}
          <p className="forgot-password text-right">
            <Link to="login">Don't have an account? Signup here</Link>
          </p>
        </form>
      </div>

    );
  }
}

export default withRouter(SignUp);