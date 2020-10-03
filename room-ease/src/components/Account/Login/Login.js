import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = { email: '', password: '' };
      }
      handleEmail = event => {
        this.setState({ email: event.target.value });
      };
      handlePassword = event => {
        this.setState({ password: event.target.value });
      };
      authenticateUser =()=>{
            console.log("asdasd")
                return alert('Enter emailId or Password')
            
      }
    render() {
        return (
            <form onSubmit={this.authenticateUser}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input  value={this.state.email}
           onChange={this.handleEmail} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label >Password</label>
                    <input  value={this.state.password}
           onChange={this.handlePassword} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                <p className="forgot-password text-right">
                    <Link to="sign-up">Create account</Link>
                </p>
            </form>
            
        );
    }
}
