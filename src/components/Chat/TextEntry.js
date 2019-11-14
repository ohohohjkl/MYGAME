import React from 'react'
import '../CSS/Chat.css'


export default class TextEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendMess: { user: null, mess: null },
            rev: false,
        }
    }

    sendnewMessage() {
        if (this.state.sendMess.mess) {
            this.state.rev = true;
            this.socket.emit("newMessage", this.state.sendMess);
            this.state.sendMess.mess = ""
        }
    }


    render() {
        return (
            <div className="bottom_wrapper">
                <div className="message_input_wrapper">
                    <input ref="messageInput" type="text" className="message_input" placeholder="Type your message here" onKeyUp={() => { }} />
                </div>
                <div className="send_message" onClick={this.sendnewMessage.bind(this)} ref="inputMessage" >
                    <div className='icon'></div>
                    <div className='text'>Send</div>
                </div>
            </div>
        )
    }
}