import React from 'react';

import '../CSS/Chat.css';

export default class MessageItem extends React.Component {

    
    render () {
        return (
            <li className={this.props.user.isAligned? "message right appeared": "message left appeared"}>
                <div className="avatar" style={{textAlign:'center'}}>{this.props.user.name}</div>
                <div className="text_wrapper">
                    <div className="text">{this.props.message}</div>
                </div>
            </li>
        )
    }
}