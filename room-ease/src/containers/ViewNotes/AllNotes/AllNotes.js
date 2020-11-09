import React, { Component } from 'react';
import * as classes from './allnotes.module.css';
import axios from 'axios';
import NotesList from '../../../components/NotesList/NotesList'
import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';
import addIcon from '../../../assets/addIcon.png';
import { Link } from 'react-router-dom';
import {VIEW_ROOM_NOTES_URL,VIEW_SELF_NOTES_URL,CREATE_NOTES_URL} from '../../../constants/ClientRoutes';

class AllNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            self:false,
            roomName:localStorage.getItem("roomName"),
            //Need  the data from Notes API in notes ---> Title, Note, (Maybe date and by whom was the note created)
            selfNotes:[
                {
                    _id:"1",
                    Title: "Note1",
                    Note: "Note1Note1Note1Note1Note1Note1Note1",
                    },
                
                    {
                        _id:"2",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"3",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"4",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"5",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"6",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },
            ],
            roomNotes:[
                {
                    _id:"1",
                    Title: "Note634",
                    Note: "Note1Note1Note1Note1Note1Note1Note1",
                    },
                
                    {
                        _id:"2",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"3",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"4",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"5",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"6",
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },
            ]

        }
    }
    render(){
        return(
            <div style={{marginTop:50}}>
              {/* <NoteTabs url={this.props.match.url}></NoteTabs> */}
              <div className={classes.Header}>
                    {this.state.self?<h1>All Notes of {this.state.roomName}</h1>:<h1>All your personal notes</h1>}
                    <Link to={CREATE_NOTES_URL} style={{ textDecoration: "none" }}>
                        <img src={addIcon} alt={"Add note"} className={classes.Icon} />
                    </Link>
                </div>
                {this.state.self?<NotesList notes={this.state.selfNotes} roomName={this.state.roomName} />:<NotesList notes={this.state.roomNotes} roomName={this.state.roomName}/>}
              
            </div>
        )
    }


}
export default withLayout(AllNotes);

