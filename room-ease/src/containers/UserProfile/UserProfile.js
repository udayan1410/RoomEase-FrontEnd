import React, { Component } from 'react';
import RegularButton from "../../components/inputs/RegularButton";
import TextInput from "../../components/inputs/TextInput";
import { Link, withRouter } from "react-router-dom";

import * as classes from './userprofile.module.css';
import axios from 'axios';
import {MEMBERS_OF_ROOM_URL,USER_PROFILE_URL} from '../../constants/ServerRoutes';
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
        let userID="5f7918453c2bc625c03ecb20"
        let roomName=localStorage.getItem('roomName')
        console.log("adasd",userID,roomName)
        let profileStatus= (await axios.get(USER_PROFILE_URL+"?userID="+userID+"&roomName="+roomName)).data;
        let {Result,Error}= profileStatus
        console.log("received data",profileStatus.userInfo)
        this.setState({roomInfo:profileStatus.Members});
        let obj={}
        obj["Username"]=profileStatus.userInfo.userName;
        obj["Room Name"]=roomName;
        obj["Email id"]=profileStatus.userInfo.email;
        obj["Phone no"]=profileStatus.userInfo.phoneNumber;
        this.setState({userInfo:obj});
        console.log(this.state.roomInfo);
    }
    check=()=>{
        console.log("Adsdas")
    }

    render(){
        return(
        <div >
        
                {console.log("adasd",this.state.userInfo)}
               
                <div className={classes.user}>
                    <div className={classes.userprofilebox}>
                            <img src={require('../../../src/assets/profile.png')} className={classes.profileimg}/>
                    </div>
                    <h3 className={classes.username}>@{this.state.userInfo.Username}</h3>
                </div>


                
                
                <div className={classes.userinfo}>
                   {Object.keys(this.state.userInfo).map((key)=>{
                       return(
                       <div className={classes.info}>
                           <h3 className={classes.category}>{key} :</h3>
                           <h4 className={classes.value}>{this.state.userInfo[key]}</h4>
                       </div>
                   )})}                   
           
                </div>
                

                <RegularButton text="Leave Room"></RegularButton>
         
            {/* <div className={classes.right}>
                <h1>safds</h1>
                {this.state.roomInfo.map((person, index) => (
                <p key={index}>Hello, {person.userName} !</p>
                ))}
            </div> */}
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


