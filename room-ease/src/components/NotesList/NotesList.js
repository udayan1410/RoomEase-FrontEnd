import * as classes from './noteslist.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROOM_URL } from '../../constants/ClientRoutes';

const NotesList = props => {
    return (
        <div className={classes.Container}>
            {props.notes.map(note => {
                const MAX_LENGTH = 50;

                let Title = note.Title;
                if (Title.length > MAX_LENGTH)
                    Title = Title.slice(0, MAX_LENGTH) + "...";
                
                
                return (
                   
                        <div className={classes.MainItem}>
                            <div className={classes.ListItem}>
                                <p className={classes.TaskName}>{Title}</p>
                                <p className={classes.TaskComments}>{note.Note}</p>
                            </div>
                        </div>
                    
                )
            })}
        </div>

    );

}
export default NotesList;