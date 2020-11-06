import React, { Component } from 'react';
import * as classes from './allnotes.module.css';
import axios from 'axios';
import { USER_PROFILE_URL} from '../../../constants/ServerRoutes';
import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';

class AllNotes extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }


}
export default withLayout(AllNotes);

