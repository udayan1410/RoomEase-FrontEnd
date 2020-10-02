import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = { email: '', password: '', FirstName:'', LastName:'' };
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
      handleLastName = event => {
        this.setState({ LastName: event.target.value });
      };
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input value={this.state.FirstName}
           onChange={this.handleFirstName} type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input value={this.state.LastName}
           onChange={this.handleLastName} type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input value={this.state.email}
           onChange={this.handleEmail} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={this.state.password}
           onChange={this.handlePassword} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/">sign in?</Link>
                </p>
            </form>
        );
    }
}