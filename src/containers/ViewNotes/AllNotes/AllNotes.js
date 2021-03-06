import React, { Component } from 'react';
import * as classes from './allnotes.module.css';
import Axios from 'axios';
import NotesList from '../../../components/NotesList/NotesList'
import { withLayout } from '../../../hoc/Layout/withLayout'
import addIcon from '../../../assets/addIcon.png';
import { Link } from 'react-router-dom';
import * as SplitEaseClientRoutes from '../../../constants/ClientRoutes';
import { SELF_NOTES_URL, ROOM_NOTES_URL } from '../../../constants/ServerRoutes'
import Tabs from '../../../components/Tabs/Tabs';

class AllNotes extends Component {
    state = {
        self: true,
        roomName: localStorage.getItem("roomName"),
        userID: localStorage.getItem("userID"),
        selfNotes: [],
        roomNotes: [],

    }

    getAllNotes = async () => {
        try {
            let Notes
            if (this.state.self)
                Notes = await Axios.get(`${SELF_NOTES_URL}?roomName=${this.state.roomName}&userID=${this.state.userID}`)
            else
                Notes = await Axios.get(`${ROOM_NOTES_URL}?roomname=${this.state.roomName}`)

            let NotesModel = Notes.data;
            if (NotesModel.Result === "Success") {
                if (this.state.self)
                    this.setState({ selfNotes: NotesModel.notes });
                else
                    this.setState({ roomNotes: NotesModel.notes });
            }
        }
        catch (err) {
            console.log("[TASKS.js] Something went wrong ", err);
        }
    }

    componentDidMount() {
        this.getAllNotes();
    }

    componentDidUpdate() {

        let link = this.props.location.pathname;

        if (this.state.self) {
            if (link.includes(SplitEaseClientRoutes.VIEW_ROOM_NOTES_URL))
                this.setState({ self: false }, () => this.getAllNotes())
        }
        else {
            if (link.includes(SplitEaseClientRoutes.VIEW_SELF_NOTES_URL))
                this.setState({ self: true }, () => this.getAllNotes())
        }

    }

    render() {

        let getTabsList = () => {
            let tabsList = [
                { name: "Self Notes", url: SplitEaseClientRoutes.VIEW_SELF_NOTES_URL },
            ]
            let roomName = localStorage.getItem("roomName");

            if (roomName !== "null")
                tabsList.push({ name: "Room Notes", url: SplitEaseClientRoutes.VIEW_ROOM_NOTES_URL });

            return tabsList;
        }

        return (
            <div className={classes.Container}>
                <Tabs tabsList={getTabsList()} url={this.props.match.url} />
                <div className={classes.Header}>
                    {!this.state.self ? <h1>All Notes of {this.state.roomName}</h1> : <h1>All  Notes</h1>}
                    <Link to={SplitEaseClientRoutes.CREATE_NOTES_URL} style={{ textDecoration: "none" }}>
                        <img src={addIcon} alt={"Add note"} className={classes.Icon} />
                    </Link>
                </div>
                {this.state.self ? <NotesList notes={this.state.selfNotes} roomName={this.state.roomName} /> : <NotesList notes={this.state.roomNotes} roomName={this.state.roomName} />}
            </div>
        )
    }


}
export default withLayout(AllNotes);

