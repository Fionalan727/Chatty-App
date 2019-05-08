
import React,{Component} from 'react';


class ChatBar extends Component {
    
    render(){
        const handleKeyPress =(event)=>{
            if(event.key=== 'Enter'){
                let nmessage = event.target.value;
                this.props.addMessage(nmessage);
            }
        }
        const changeUserInfo = evt => {
            let newValue = evt.target.value;
            this.props.changeStateName(newValue);
        }
        return (
            <footer className ="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser} onChange={changeUserInfo}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress ={handleKeyPress}/>
            </footer>
        );
    } 
}
    
export default ChatBar;