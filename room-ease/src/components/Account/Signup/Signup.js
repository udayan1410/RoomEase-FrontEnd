import React, { Component } from "react";
import { Link,Redirect, useHistory } from "react-router-dom";
import RegularButton from "../../inputs/RegularButton";
import TextInput from "../../inputs/TextInput";
import * as classes from './signup.module.css';
import axios from 'axios';
import { ROOM_URL, SIGNUP_URL } from '../../../constants/ServerRoutes';
import JoinRoom from '../../JoinRoom/JoinRoom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect:ROOM_URL, email: '', userName:'', password: '', FirstName: '', phoneNumber: '',error:'' };
  }
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
    if (this.state.email === '' ||this.state.FirstName === '' ||this.state.phoneNumber === '' ||this.state.userName === '' || this.state.password === '')
    this.setState({ error: "Email id/ Password cannot be empty" })
  }
  authenticateUser = async () => {
    let history=useHistory();
    
    try {
      this.validate();

        let loginCredentials = {userName:this.state.userName,phoneNumber:this.state.phoneNumber,  email: this.state.email, password: this.state.password }
        console.log(loginCredentials)
        let loginStatus = (await axios.post(SIGNUP_URL, loginCredentials)).data;
        console.log(loginStatus)
        let { Result, Error } = loginStatus;
        console.log("sadas",Result);
        
        if (Result === "Success")
            {
              this.setState({ error: "Success" })
              history.goBack();
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
            erorrMessage = (<p className={classes.error}>{this.state.error}</p>)

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
      // <form>
      //   <h3>Sign Up</h3>

      //   <div className="form-group">
      //     <label>First name</label>
      //     <input value={this.state.FirstName}
      //       onChange={this.handleFirstName} type="text" className="form-control" placeholder="First name" />
      //   </div>

      //   <div className="form-group">
      //     <label>Phone Number</label>
      //     <input value={this.state.phoneNumber}
      //       onChange={this.handlephoneNumber} type="text" className="form-control" placeholder="Last name" />
      //   </div>

      //   <div className="form-group">
      //     <label>Email address</label>
      //     <input value={this.state.email}
      //       onChange={this.handleEmail} type="email" className="form-control" placeholder="Enter email" />
      //   </div>

      //   <div className="form-group">
      //     <label>Password</label>
      //     <input value={this.state.password}
      //       onChange={this.handlePassword} type="password" className="form-control" placeholder="Enter password" />
      //   </div>

      //   <button type="submit" onSubmit={this.authenticateUser} className="btn btn-primary btn-block">Sign Up</button>
      //   <p className="forgot-password text-right">
      //     Already registered <Link to="/login">sign in?</Link>
      //   </p>
      // </form>
    );
  }
}