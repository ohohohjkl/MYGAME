import React from 'react'
import '../App.css'


export default class MatchMaking extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            roomID:"",
        }
    }

    render() {
        return (
            <div>
                <div className="topRadius" style={styles.accordion}>
                    <div style={styles.textLeft}>
                        <div style={{ marginTop: 13 }}>{"Lobby ID: " + this.props.roomID}</div>
                    </div>
                    <div style={styles.textRightz}>
                        <div style={{ marginTop: 10 }}>
                            <button style={styles.button} onClick={() => { this.props.initRoom(true) }}> Create Lobby</button>
                        </div>
                    </div>

                </div>
                <div className="topRadius" style={styles.accordion}>
                    <div style={styles.textLeft}>
                        <input type="text" style={styles.inputz}
                            value=""
                            onChange={event => {
                                this.state.roomID = event.target.value;
                                this.setState(this.state);
                            }}>
                        </input>
                    </div>

                    <div style={styles.textRightz}>
                        <div style={{ marginTop: 10 }}>
                            <button style={styles.button} onClick={()=>{this.props.joinRoom(this.state.roomID)}}> Join Lobby</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

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
        width: '80%',
        background: 'rgb(81, 84, 125)',
        border: 'none',
        fontSize: 18,
        color: '#fff',
        padding: '8px 10px',
        boxSizing: 'border-box',
        marginTop: 8,
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
    button: {
        backgroundColor: 'rgb(105, 108, 149)',
        color: '#ddd',
        width: 392,
        height: 45,
        marginTop: -4,
        fontWeight: '600',
        fontSize: 14,
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        borderRadius: 10,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
        padding: '0px 20px',
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
        background: 'rgb(23, 23, 50)',
        cursor: 'pointer',
        padding: '0px 18px',
        width: '65%',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        fontSize: 18,
        marginTop: 1,
        height: 55,
        display: 'inherit',
        borderRadius: 0,
        boxSizing: 'border-box',
    },
}