import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import RegularButton from "../../../components/inputs/RegularButton";
import TextInput from "../../../components/inputs/TextInput";
import * as classes from './signup.module.css';
import axios from 'axios';
import { SIGNUP_URL } from '../../../constants/ServerRoutes';

class SignUp extends Component {

  state = {
    email: '',
    userName: '',
    password: '',
    phoneNumber: '',
    error: '',
    emailerror: '',
  };

  handleEmail = event => {
    this.setState({ email: event.target.value });
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (!re.test(event.target.value)) {
    //   this.setState({ emailerror: "Enter valid email" })
    // }
    // else
    //   this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handlephoneNumber = event => {
    this.setState({ phoneNumber: event.target.value });
  };
  handleUserName = event => {
    this.setState({ userName: event.target.value });
  };
  validate = () => {

    if (this.state.email === '' || this.state.phoneNumber === '' || this.state.userName === '' || this.state.password === '')
      return false
    return true
  }
  authenticateUser = async () => {

    if (this.validate()) {
      try {

        let loginCredentials = { userName: this.state.userName, phoneNumber: this.state.phoneNumber, email: this.state.email, password: this.state.password }
        let loginStatus = (await axios.post(SIGNUP_URL, loginCredentials)).data;
        let { Result, Error } = loginStatus;
        console.log(Result)
        if (Result === "Success") {
          this.setState({ error: "" })
          this.props.history.goBack();
        }
        else
          this.setState({ error: Error })
      }
      catch (err) {
        this.setState({ error: err.message })
      }
    }
    else {
      this.setState({ error: "Fields cannot be empty" })
    }
  }

  render() {
    let erorrMessage = null;
    let emailError = null;
    if (this.state.error)

      erorrMessage = (<p className={classes.error}>{this.state.error}</p>)
    if (this.state.emailerror)
      emailError = (<p className={classes.error}>{this.state.emailerror}</p>)


    return (
      <div >
        <h1>RoomEase</h1>
        <form className={classes.Form}>
          <p className={classes.signup}>Sign Up</p>
          <TextInput hint="Enter Username" type="text" onChange={this.handleUserName} />
          <TextInput hint="Enter Password" type="password" onChange={this.handlePassword} />
          <TextInput hint="Enter Email id" type="email" onChange={this.handleEmail} />
          {emailError}
          <TextInput hint="Enter Phone Number" type="number" onChange={this.handlephoneNumber} />
          <RegularButton text="SUBMIT" onClick={this.authenticateUser} />
          {erorrMessage}
          <p className="forgot-password text-right">
            <Link to="login">Already a User? Sign In here</Link>
          </p>
        </form>
      </div>

    );
  }
}

export default withRouter(SignUp);