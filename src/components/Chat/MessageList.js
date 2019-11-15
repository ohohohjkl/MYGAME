import React from 'react';
import Item from './MessageItem';

import '../CSS/Chat.css'


export default class MessageList extends React.Component {
    render () {
        return (
            <ul className="messages clo-md-5">
                {this.props.messages.map(item =>
                    <Item key={item.userId} user={{isAligned:item.userId == this.props.user.id? true : false,
                    name:item.name}} message={item.message}/>
                )}   
            </ul>
        )
    }
}