import React, { Component } from 'react';
import * as classes from './createnotes.module.css';
import Axios from 'axios';
import { connect } from 'react-redux';

import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';
import TextInput from '../../../components/inputs/TextInput';
import { NOTES_CREATION_URL } from '../../../constants/ServerRoutes';

class CreateNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            note:'',
            title:'',
            shared:false,
        }
    }
    handleChange=(event)=>{
        this.setState({note: event.target.value})
    }
    titleChange=(event)=>{
        this.setState({title:event.target.value});
    }

    
    shareNote=()=>{
        this.setState({shared:true})
        this.uploadNote()
        this.props.history.push('/notes')
    }
    uploadNote= async()=>{
        if(this.state.note.length!=0 && this.state.title.length!=0)
        {
        
       
        let notesModel = {
            noteTitle: this.state.title,
            body: this.state.note ,
            roomName: localStorage.getItem("roomName"), 
            userID: localStorage.getItem("userID"),
            shared: this.state.shared, 
        };


        let notesCreationStatus = (await Axios.post(NOTES_CREATION_URL , notesModel)).data;
        
        
        // //**********PLEASE CHECK THIS */
        if (notesCreationStatus.Result === "Success")
           alert("Success")
        else
            alert("Failed") 
        // this.props.history.push('/notes/view');
    }
    else
    {
        alert("Please fill required details")
        
    }
    }
    handleSharing=()=>{
        this.setState({shared:!this.state.shared})
    }
    render(){
        return (
          <div >
                <input value={this.state.title} placeholder="Title" onChange={this.titleChange} className={classes.title}/>
                <textarea placeholder="Type your note here.." className={classes.note} name="text area" value={this.state.note} onChange={this.handleChange}></textarea>
                
                <div className={classes.buttoncontainer}>
                    <div className={classes.button1}>
                    <p>Share with roommates:<input type="checkbox" checked={this.state.shared} onClick={this.handleSharing}/></p>
                    
                        <RegularButton onClick={this.shareNote} text="Share with room"> </RegularButton>

                    </div>
                    
                </div>

          </div>  
        );
    }


}

export default withLayout(CreateNotes);