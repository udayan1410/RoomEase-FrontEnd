import React, { Component } from 'react';
import * as classes from './singlenote.module.css';
import axios from 'axios';
import { USER_PROFILE_URL} from '../../../constants/ServerRoutes';
import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';

class SingleNote extends Component{
    constructor(props){
        super(props);
        this.state={
            note:'Note 1',
            title:'Title1',
        }
    }
    handleChange=(event)=>{
        this.setState({note: event.target.value})
    }
    titleChange=(event)=>{
        this.setState({title:event.target.value});
    }
    shareNote=()=>{
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let createdOn = new Date();
        createdOn = `${monthNames[createdOn.getMonth()]} ${createdOn.getDate()} ${createdOn.getFullYear()}`;
        let columns = {};
        columns.daysOfTheWeek = this.state.columns.daysOfTheWeek;
        columns.users = this.state.columns.users;
        columns.timeOfDay = `${this.state.hours}:${this.state.minutes} ${this.state.timePeriod}`

        // let notesModel = {
        //     noteTitle: this.state.title,
        //     body: this.state.note ,
        //     roomName: localStorage.getItem(roomName), 
        //     userID: localStorage.getItem(userID)
        // };


        // let notesCreationStatus = (await Axios.post(NOTES_CREATION_URL , notesModel)).data;
        
        
        // //**********PLEASE CHECK THIS */
        // if (notesCreationStatus.Result === "Success")
        //     this.props.history.push('/notes/view');

        // else
        //     console.log(notesCreationStatus);
    }
    
    render(){
        return(
            <div>
               <input value={this.state.title} placeholder="Title" onChange={this.titleChange} className={classes.title}/>
                <textarea placeholder="Type your note here.." className={classes.note} name="text area" value={this.state.note} onChange={this.handleChange}></textarea>
                
                <div className={classes.buttoncontainer}>
                    
                    <div className={classes.button2}>
                        <RegularButton onClick={this.saveNote} text="Update note"></RegularButton>
                    </div>
                </div>
 
            </div>
        )
    }


}
export default withLayout(SingleNote);