import React, {Component} from 'react';
import { Link } from "react-router-dom";
import RegularButton from "../../inputs/RegularButton";
import TextInput from "../../inputs/TextInput";
import * as classes from './joinroom.module.css';
import axios from 'axios';

export default class JoinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            userID:'',
            error:''
        };
    }
    handleRoomName= event=>{
        this.setState({roomName:event.target.value});
    }
    authenticateRoom= ()=>{

    }
    render(){
        let errorMessage= null;
        if(this.state.error)
            errorMessage=(<p className={classes.error}>{this.state.error}</p>)

        return(
            <div>
                <h1>RoomEase</h1>
                <div>
                    <p> Join Room </p>
                    <TextInput hint="Enter room name" type="text" onChange={this.handleRoomName} ></TextInput>
                    <RegularButton disabled={this.state.roomName} text="Join" onClick={this.authenticateRoom}></RegularButton>
                    <h3> OR</h3>
                    <RegularButton text="Creat a room" onClick={this.createRoom}></RegularButton>
                </div>
            </div>
        );


    }
}

