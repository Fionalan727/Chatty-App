
import React,{Component} from 'react';


class ChatBar extends Component {
    
    render(){
        const handleKeyPress =(event)=>{
            if(event.key=== 'Enter'){
                let nmessage = event.target.value;
                this.props.addMessage(nmessage);
            }
        }
        return (
            <footer className ="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress ={handleKeyPress}/>
            </footer>
        );
    } 
}
    
export default ChatBar;