
import React,{Component} from 'react';


class Message extends Component{
    render(){
        let user_style = {
            color: this.props.color
          } 
        console.log(this);
        if (this.props.type === "incomingMessage") {

            return (
                <li className="message">            
                  <span className="message-username" style={user_style}>{this.props.user}</span>
                  <span className="message-content">{this.props.content}</span>
                </li>
                
            );

        }
        else if(this.props.type === "incomingNotification"){
            return(
                <div className="message system">
                    {this.props.content}
                </div>
            );
            
        }
       
    } 
}



export default Message;

