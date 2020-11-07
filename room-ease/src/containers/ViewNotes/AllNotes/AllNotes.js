import React, { Component } from 'react';
import * as classes from './allnotes.module.css';
import axios from 'axios';
import NotesList from '../../../components/NotesList/NotesList'
import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';

class AllNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            //Need  the data from Notes API in notes ---> Title, Note, (Maybe date and by whom was the note created)
            notes:[
                {
                    Title: "Note1",
                    Note: "Note1Note1Note1Note1Note1Note1Note1",
                    },
                
                    {
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },{
                        Title: "Note2",
                        Note: "Note1Note1Note1Note1Note1Note1Note1 asdsadsadasdsadasdsadasdasdasdas adasdsadasdasdsadsadasdadasdas asdasdasdsadsadsadadasdsa asdasdasdsadas asdas sadasdas asdas sadasdasdas asdasdasd asdsadas",
                    },
            ]
        }
    }
    render(){
        return(
            <div style={{marginTop:50}}>
              
              <NotesList notes={this.state.notes} />
            </div>
        )
    }


}
export default withLayout(AllNotes);

