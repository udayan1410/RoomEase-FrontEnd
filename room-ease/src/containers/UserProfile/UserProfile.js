import React, { Component } from 'react';
import RegularButton from "../../components/inputs/RegularButton";
import TextInput from "../../components/inputs/TextInput";
import * as classes from './userprofile.module.css';
import axios from 'axios';
import { USER_PROFILE_URL,MEMBERS_OF_ROOM_URL } from '../../constants/ServerRoutes';


class UserProfile extends Component{
    constructor(props){
    super(props);
        
    }
    hasRoom= async ()=>{
        let userID='5f79657944f5f348ac09d781'
        let roomname="SCU"
        let userStatus=(await axios.post(MEMBERS_OF_ROOM_URL, roomname)).data;
        let { responseObject, user } = userStatus;
        console.log(responseObject)

        if (responseObject.Result === "Success")
        {
            return(
                <div>
                    <p>Hi</p>
                </div>
            )
        }
        else
            return null


    }


    
    
    render(){
        return(
        <div>

            
            {this.hasRoom}
            
        </div>
        );



    }




}

export default UserProfile;


