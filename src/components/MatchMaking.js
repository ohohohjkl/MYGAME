import React from 'react'
import '../App.css'


export default class MatchMaking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: "",
        }
    }

    render() {
        return (
            <div>
                <div style={styles.accordion}>
                    <div style={styles.textLeft}>
                        <div style={{ fontSize: 20, lineHeight: '50px' }}>{"Lobby ID: " + this.props.roomID}</div>
                    </div>
                    <div style={styles.textRightz}>
                        <div>
                            <button style={styles.button} onClick={() => { this.props.initRoom(true) }}> Create Lobby</button>
                        </div>
                    </div>

                </div>
                <div style={styles.accordion}>
                    <div style={styles.textLeft}>
                        <input type="text" style={styles.inputz}
                            placeholder="Enter lobby to join"
                            value={this.state.roomID}
                            onChange={event => {
                                this.state.roomID = event.target.value;
                                this.setState(this.state);
                            }}>
                        </input>
                    </div>

                    <div style={styles.textRightz}>
                        <div>
                            <button style={styles.button} onClick={() => { this.props.joinRoom(this.state.roomID) }}> Join Lobby</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const styles = {
    inputz: {
        width: '90%',
        height: 50,
        color: 'azure',
        background: 'linear-gradient(rgb(76, 68, 124), rgb(40, 36, 64))',
        borderRadius: 25,
        border: 'none',
        fontSize: 16,
        boxShadow: 'rgb(0, 0, 0) 0px 6px 50px',
        outline: 'none',
        padding: '0 20px',
    },
    textLeft: {
        width: 800,
        float: 'left',
        position: 'relative',
        height: 50,
        color: 'azure'
    },
    textRight: {
        // width: '30%',
        float: 'left',
        height: 50,
        position: 'relative',
    },
    button: {
        width: 150,
        height: 50,
        color: 'azure',
        background: 'linear-gradient(rgb(85, 170, 128), rgb(58, 116, 87))',
        borderRadius: 25,
        border: 'none',
        fontSize: 16,
        boxShadow: 'rgb(0, 0, 0) 0px 6px 50px',
        outline: 'none',
    },
    accordion: {
        // width: 800,
        // margin: '0 auto',
        cursor: 'pointer',
        padding: '0px 18px',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        fontSize: 18,
        height: 55,
        display: 'inherit',
        borderRadius: 0,
        boxSizing: 'border-box',
    },
}