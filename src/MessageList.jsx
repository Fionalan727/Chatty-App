
import React,{Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component{
    render(){
        let messageContent = this.props.messages.map((message)=> 
            <Message key = {message.id} content={message.content} user={message.username}/>
        )
        return (
            <main className="messages">
               {messageContent}
            </main>
        );
    } 
}



export default MessageList;