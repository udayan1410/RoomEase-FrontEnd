import React, { Component } from 'react';
import * as classes from './createnotes.module.css';
import axios from 'axios';
import { withLayout } from '../../hoc/Layout/withLayout'
import RegularButton from '../../components/inputs/RegularButton';
import TextInput from '../../components/inputs/TextInput';

class CreateNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            note:'',
            title:'',
        }
    }
    handleChange=(event)=>{
        this.setState({note: event.target.value})
    }
    titleChange=(event)=>{
        this.setState({title:event.target.value});
    }
    saveNote=()=>{

    }
    shareNote=()=>{

    }
    
    render(){
        return (
          <div >
                <input value={this.state.title} placeholder="Title" onChange={this.titleChange} className={classes.title}/>
                <textarea placeholder="Type your note here.." className={classes.note} name="text area" value={this.state.note} onChange={this.handleChange}></textarea>
                
                <div className={classes.buttoncontainer}>
                    <div className={classes.button1}>
                        <RegularButton onClick={this.shareNote} text="Share with room"> </RegularButton>
                    </div>
                    <div className={classes.button2}>
                        <RegularButton onClick={this.saveNote} text="Save note"></RegularButton>
                    </div>
                </div>

          </div>  
        );
    }


}

export default withLayout(CreateNotes);