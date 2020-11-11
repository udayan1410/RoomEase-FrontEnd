import React, { Component } from 'react';
import * as classes from './allnotes.module.css';
import Axios from 'axios';
import NotesList from '../../../components/NotesList/NotesList'
import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';
import addIcon from '../../../assets/addIcon.png';
import { Link } from 'react-router-dom';
import {VIEW_ROOM_NOTES_URL,VIEW_SELF_NOTES_URL,CREATE_NOTES_URL} from '../../../constants/ClientRoutes';
import {SELF_NOTES_URL} from '../../../constants/ServerRoutes' 

class AllNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            self:true,
            roomName:localStorage.getItem("roomName"),
            userID:localStorage.getItem("userID"),
            //Need  the data from Notes API in notes ---> Title, body, (Maybe date and by whom was the note created)
            selfNotes:[],
            roomNotes:[
                {
                    _id:"1",
                    title: "Note634",
                    body: "Note1Note1Note1Note1Note1Note1Note1",
                    },
                
                    {
                        _id:"2",
                        title: "Note2",
                        body: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"3",
                        title: "Note2",
                        body: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"4",
                        title: "Note2",
                        body: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"5",
                        title: "Note2",
                        body: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        _id:"6",
                        title: "Note2",
                        body: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },
            ]

        }
    }


    getAllNotes = async () => {
        try {
            let SelfNotes = await Axios.get(`${SELF_NOTES_URL}?roomName=${this.state.roomName}&userID=${this.state.userID}`)
            
            let NotesModel = SelfNotes.data;
            if(NotesModel.Result=="Success")
            {
                this.setState({selfNotes:NotesModel.notes});
                console.log("Yooo",this.state.selfNotes)

            let notes = NotesModel;
            // this.setState({ tasks });
            console.log(notes);
            }
        }
        catch (err) {
            console.log("[TASKS.js] Something went wrong ", err);
        }
    }
    
    componentDidMount() {
        this.getAllNotes();
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

