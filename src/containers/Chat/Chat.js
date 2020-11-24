import React, { Component } from 'react';
import * as classes from './chat.module.css';
import { BASE_URL, CHAT_URL } from '../../constants/ServerRoutes'
import TextInput from '../../components/inputs/TextInput';
import RegularButton from '../../components/inputs/RegularButton';
import profileIcon from '../../assets/profile.png';
import Axios from 'axios';

const io = require('socket.io-client');


class Chat extends Component {
    socket = null;
    timeout = 0;

    state = {
        roomName: this.props.match.params.roomName,
        message: "",
        chatMessages: [],
        promptMessage: "",
        loading: false,
    }

    componentWillUnmount() {
        this.messagesEnd = null;
        this.socket.disconnect();
        this.socket = null;
    }

    fetchOldMessages = async () => {
        let chatData = (await Axios.get(`${CHAT_URL}?roomname=${this.state.roomName}`)).data;

        let Chat = chatData.Chat;
        let chatMessages = [...this.state.chatMessages];
        chatMessages.push(...Chat);

        await this.setState({ chatMessages })
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
        this.connectToServer();
    }

    connectToServer = async () => {

        this.socket = io.connect(`${BASE_URL}?room=${this.state.roomName}&userid=${localStorage.getItem('userID')}`);

        this.socket.on('roomMessage', (data) => {
            let chatMessages = [...this.state.chatMessages];
            chatMessages.push(data);
            this.setState({ chatMessages }, () => {
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
            })
        })


        this.socket.on('chatMessage', (data) => {
            let chatMessages = [...this.state.chatMessages];
            chatMessages.push(data);
            this.setState({ chatMessages }, () => {
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
            })
        })

        this.socket.on('promptMessage', (data) => {
            if (data.id !== localStorage.getItem('userID'))
                this.setState({ promptMessage: data.message })
        })

    }


    componentDidMount() {
        this.fetchOldMessages();
        this.messageInput.focus();
    }

    changedChatMessage = (event) => {
        let data = { id: localStorage.getItem('userID'), room: this.state.roomName }
        this.socket.emit('typing', data);

        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout((data) => {
            this.socket.emit('stop_typing', data);
        }, 1000, data);

        let message = event.target.value;
        this.setState({ message })
    }

    sendChatMessage = async () => {

        let data = {
            room: this.state.roomName,
            id: localStorage.getItem('userID'),
            message: this.state.message,
        }
        await this.socket.emit('message', data);
        this.setState({
            message: ""
        })
    }

    render() {

        return (
            <div className={classes.Container}>

                <h1>Chats of {this.state.roomName}</h1>
                <div className={classes.chatFrame}>
                    <div>
                        {this.state.chatMessages.map(message => {
                            return (
                                <div key={message.messageID} className={classes.ChatMessage}>
                                    <div className={classes.userProfile}><img src={profileIcon} alt={"Profile Icon"}></img></div>
                                    <div className={classes.MessageData}>
                                        <p className={classes.MessageSender}>{message.sender} <span className={classes.MessageTime}>{message.messageTime}</span></p>
                                        <p className={classes.MessageText}>{message.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <p>{this.state.promptMessage}</p>
                <TextInput
                    hint="Send a message..."
                    onChange={this.changedChatMessage}
                    value={this.state.message}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            this.sendChatMessage();
                    }}
                    reference={(input) => {
                        this.messageInput = input;
                    }}
                ></TextInput>
                <RegularButton
                    text={"Send"}
                    onClick={this.sendChatMessage}
                    disabled={this.state.loading}
                ></RegularButton>
            </div >
        )
    }
}




export default Chat;