
import React,{Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component{
    render(){
        let messageContent = this.props.messages.map((message)=> 
            <Message key = {message.id} content={message.content} user={message.username } type ={message.type} color={message.color}/>
        )
        console.log(this)
        return (
            <main className="messages">
               <ul>{messageContent}</ul>
            </main>
        );
    } 
}



export default MessageList;