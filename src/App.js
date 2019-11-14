import React from 'react'
import Field from './components/Field'
import './App.css'
import TextEntry from './components/Chat/TextEntry'
import Messages from './components/Chat/MessageList'
import io from 'socket.io-client';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          messages: [
            { name: 1, userId: 0, message: {user:null, mess:"hello"} }
          ],
          user: null,
          userName: null,
        //   sendMess: {user:null, mess:null},
        //   rev: false
        }
        this.socket = null;
      }

      componentWillMount() {
        this.socket = io('localhost:6969');
        this.socket.on('id', res => {
          this.setState({ user: res });
        })
        this.socket.on('newMessage', (response) => { this.newMessage(response) });
      }

      newMessage(m) {
        this.state.user = m.id;
        this.state.messages.push({
          id: 0,
          userId: m.id,
          message: m.data
        });
        this.setState(this.state);
    
      }
    

      getDisplayMessage(item) {
        // if (item.userId == this.state.user) {
        // if (this.state.rev)
        return "\n" + item.message.user + ":" + item.message.mess;
        // }
        // return ""
      }

    render() {
        return (
            <div className="app">
                <div className="title">Tetris</div>
                <div>
                    <Field />

                    <div className="app__content">
                        <h1>chat box</h1>
                        <div className="chat_window">
                            <Messages user={this.state.user} messages={this.state.messages} typing={true} />
                            <TextEntry sendMessage={"hello"} />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

