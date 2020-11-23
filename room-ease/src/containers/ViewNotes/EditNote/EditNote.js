import React, { Component } from 'react';
import * as classes from './editnote.module.css';
import Axios from 'axios';
import { NOTES_URL } from '../../../constants/ServerRoutes';
import { withLayout } from '../../../hoc/Layout/withLayout'
import RegularButton from '../../../components/inputs/RegularButton';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: null,
            body: '',
            title: '',
            shared: false,
            roomName: "",
            createdBy: "",
            createdOn: "",
            userID: localStorage.getItem("userID"),
        }

    }
    handleChange = (event) => {
        this.setState({ body: event.target.value })
    }
    titleChange = (event) => {
        this.setState({ title: event.target.value });
    }



    getNotedetails = async () => {
        let noteid = this.props.match.params.noteid
        let url = NOTES_URL + "?noteid=" + noteid;
        let taskModel = (await Axios.get(url)).data;
        let { body, title, shared, createdOn, createdBy, roomName, _id } = taskModel.notes[0];
        this.setState(
            {
                title,
                roomName,
                shared,
                _id,
                body,
                createdBy,
                createdOn,

            })

    }
    handleSharing = () => {
        this.setState({ shared: !this.state.shared })
    }
    deleteNote = async () => {
        let taskDeletionStatus = (await Axios.delete(`${NOTES_URL}?noteid=${this.state._id}&userID=${localStorage.getItem("userID")}`));
        console.log("Status", taskDeletionStatus);
        this.props.history.goBack();
    }

    updateNote = async () => {
        let notesModel = {
            shared: this.state.shared,
            _id: this.state._id,
            createdOn: this.state.createdOn,
            title: this.state.title,
            body: this.state.body,
            createdBy: this.state.createdBy,
            userID: this.state.userID,
        }
        let noteUpdationStatus = (await Axios.patch(NOTES_URL, notesModel)).data;
        console.log(noteUpdationStatus);
        this.props.history.goBack();
    }
    componentDidMount() {
        this.getNotedetails();
    }
    render() {
        return (
            <div>
                <input value={this.state.title} placeholder="Title" onChange={this.titleChange} className={classes.title} />
                <textarea placeholder="Type your note here.." className={classes.note} name="text area" value={this.state.body} onChange={this.handleChange}></textarea>
                <div className={classes.buttoncontainer}>
                    <div className={classes.button2}>
                        <p>Share with roommates:<input type="checkbox" checked={this.state.shared} onChange={this.handleSharing} /></p>
                    </div>
                </div>
                <RegularButton onClick={this.updateNote} text="Update note"></RegularButton>
                <div style={{ width: 250, justifyContent: "center" }}>
                    <RegularButton onClick={this.deleteNote} text="Delete note"></RegularButton>
                </div>
            </div>
        )
    }
}
export default withLayout(EditNote);