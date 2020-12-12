import * as classes from './noteslist.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { NOTES_URL } from '../../constants/ClientRoutes';

const NotesList = props => {
    return (
        <div className={classes.Container}>
            {props.notes.map(note => {
                const MAX_LENGTH = 50;
                let shortNote = note.body;
                if (shortNote.length > MAX_LENGTH)
                    shortNote = shortNote.slice(0, MAX_LENGTH) + "...";

                let Title = note.title;
                if (Title.length > MAX_LENGTH)
                    Title = Title.slice(0, MAX_LENGTH) + "...";


                return (
                    <Link
                        to={`${NOTES_URL}/update/${note._id}`}
                        key={note._id}
                        title={note.title}
                        note={note.body}
                        style={{ textDecoration: "none" }}
                        className={classes.Link}
                    >
                        <div className={classes.MainItem}>
                            <div className={classes.ListItem}>
                                <p className={classes.TaskName}>{Title}</p>
                                <p className={classes.TaskComments}>{shortNote}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>

    );

}
export default NotesList;