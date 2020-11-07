import React, { Component } from 'react';
import * as classes from './allnotes.module.css';
import axios from 'axios';

import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';

class AllNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            notes:[
                {
                    Title: "Note1Note1Note1Note1Note1Note1Note1",
                    Note: "Note1Note1Note1Note1Note1Note1Note1",
                    },
                {
                        Title: "Note1Note1Note1Note1Note1Note1Note1",
                        Note: "Note1Note1Note1Note1Note1Note1Note1",
                    },
            ]
        }
    }
    render(){
        return(
            <div>
              {this.state.notes.map((key,idx)=>
                //  {console.log(key.Title)}
                 <h2 key={idx} >{key.Title} </h2> 
              )}
            </div>
        )
    }


}
export default withLayout(AllNotes);

