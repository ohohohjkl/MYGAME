import React from 'react'
import Field from './components/Field'
import './App.css'
import TextEntry from './components/Chat/TextEntry'
import Messages from './components/Chat/MessageList'
import MatchMaking from './components/MatchMaking'
import io from 'socket.io-client';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {
        id: null,
        name: null
      },
      Connect: false,
      createLobby:true,
    }
    this.socket = null;
  }

  componentWillMount() {
    this.socket = io('localhost:6969');
    this.socket.on('id', res => {
      this.state.user.id = res;
      this.setState(this.state);
    })
    this.socket.on('newMessage', (response) => { this.newMessage(response) });

  }

  newMessage(m) {
    this.state.messages.push(
      { name: m.data.name, userId: m.id, message: m.data.mess }
    )
    this.setState(this.state);

  }


  getDisplayMessage(item) {
    // if (item.userId == this.state.user) {
    // if (this.state.rev)
    return "\n" + item.message.user + ":" + item.message.mess;
    // }
    // return ""
  }

  Connect2Host = () => {
    this.setState({ Connect: true });
  }

  sendMessage = (mess) => {
    if (mess.value) {
      this.socket.emit("newMessage", {
        name: this.state.user.name,
        id: this.state.user.id,
        mess: mess.value
      });
      mess.value = "";
    }
  }

  initRoom = (value) =>{
    this.state.createLobby=value;
    this.setState(this.state);
  }

  render() {
    const styles = {

      label: {
        float: 'left',
        margin: '15px 30px 0 5px',
      },
      subButtonN: {
        width: 180,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
      },
      btnN: {
        width: 80,
        float: 'left',
        margin: '15px 5px',
        background: '#2e3148',
      },
      inputz: {
        width: '100%',
        background: '#21233c',
        border: 'none',
        fontSize: 18,
        color: '#fff',
        padding: '8px 10px',
        boxSizing: 'border-box',
        marginTop: -10,
        borderRadius: 5,
        outline: 'none',
      },
      rowsI: {
        width: '100%',
        float: 'left',
        position: 'relative',
      },

      accordionI: {
        background: 'none',
        cursor: 'pointer',
        padding: '0 18px',
        width: '100%',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        fontSize: 18,
        transition: '0.4s',
        marginTop: 1,
        height: 45,
        display: 'inherit',
        borderRadius: 'unset',
        borderBottom: '1px solid #555',
        boxSizing: 'border-box',
      },

      textLeft: {
        width: '40%',
        float: 'left',
        position: 'relative',
        height: 45,
        color: 'azure'
      },
      textRight: {
        width: '50%',
        float: 'left',
        height: 45,
        position: 'relative',
      },
      textRightz: {
        width: '60%',
        float: 'left',
        height: 45,
        position: 'relative',
      },

      btn: {
        width: 80,
        float: 'left',
        margin: '15px 5px',
        background: '#2e3148',
        color: 'azure'

      },
      btnz: {
        width: 150,
        float: 'left',
        margin: '15px 5px',
        background: '#d61e45',
      },
      accordion: {
        background: '#171732',
        cursor: 'pointer',
        padding: '0 18px',
        width: '100%',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        fontSize: 18,
        marginTop: 1,
        height: 45,
        display: 'inherit',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        boxSizing: 'border-box',
      },
    }
    return (
      <div className="app">
        <div className="title">X E P H I N H</div>
        {
          this.state.Connect ?
            <div>
              <MatchMaking initRoom={this.initRoom}/>
              <Field createLobby={this.state.createLobby}/>

              <div className="app_content">
                <h1>chat box</h1>
                <div className="chat_window">
                  <Messages user={this.state.user} messages={this.state.messages} />
                  <TextEntry sendMessage={this.sendMessage} />
                </div>
              </div>
            </div>
            :
            <div className="topRadius" style={styles.accordion}>
              <div style={styles.textLeft}>
                <div style={{ marginTop: 13 }}>Player Name</div>
              </div>
              <div style={styles.textRightz}>
                <div style={{ marginTop: 10 }}>
                  <input type="text" style={styles.inputz}
                    value={this.state.user.name}
                    onChange={event => {
                      this.state.user.name = event.target.value;
                      this.setState(this.state);
                    }}>
                  </input>
                  <button style={styles.btn} onClick={this.Connect2Host}> Connect</button>
                </div>
              </div>
            </div>
        }
      </div>

    )
  }
}

