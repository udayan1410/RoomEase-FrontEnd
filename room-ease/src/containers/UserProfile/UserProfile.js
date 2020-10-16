import React, { Component } from 'react';
import RegularButton from "../../components/inputs/RegularButton";
import TextInput from "../../components/inputs/TextInput";
import { Link, withRouter } from "react-router-dom";

import * as classes from './userprofile.module.css';
import axios from 'axios';
import { USER_PROFILE_URL } from '../../constants/ClientRoutes';
import {MEMBERS_OF_ROOM_URL} from '../../constants/ServerRoutes';
import { withLayout } from '../../hoc/Layout/withLayout'

class UserProfile extends Component{
    constructor(props){
    super(props);
        this.state={
            roomInfo:[],
            userInfo:{},
        }
    }
    

    componentDidMount(){
        this.hasRoom()
    }

    hasRoom= async ()=>{
        let userID=12312312
        let roomName=localStorage.getItem('roomName')
        console.log("adasd",userID,roomName)
        let profileStatus= (await axios.get(MEMBERS_OF_ROOM_URL+"?roomname=SCU")).data;
        let {Result,Error}= profileStatus
        console.log("asdasasdasdas",profileStatus.Members)
        this.setState({roomInfo:profileStatus.Members});
        let obj={}
        obj["userID"]=userID;
        obj["roomName"]=roomName;
        this.setState({userInfo:obj});
        console.log(this.state.roomInfo);
    }
    check=()=>{
        console.log("Adsdas")
    }

    render(){
        return(
        <div className={classes.container}>
            <div className= {classes.left}>
                {console.log("adasd",this.state.userInfo)}
                <div className={classes.userprofilebox}>
                        <img src={require('../../../src/assets/profile.png')} className={classes.profileimg}/>
                </div>
                <p>{this.state.userInfo.userID}</p>
                <RegularButton text="Leave Room"></RegularButton>
            </div>
            <div className={classes.right}>
                <h1>safds</h1>
                {this.state.roomInfo.map((person, index) => (
                <p key={index}>Hello, {person.userName} !</p>
                ))}
            </div>
        </div>
        );
/*
    2 subdivs
    1 for left side
           profile info
           flexbox left
           
    1 for right side
            member and roominfo
*/
    }




}

export default withLayout(UserProfile);


