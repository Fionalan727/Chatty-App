
import React,{Component} from 'react';


class ChatBar extends Component {
    // constructor(props) {
    //     super();
    //     this.state = {user: props.currentUser}
    //   }
    render(){
        const handleKeyPress =(event)=>{
            if(event.key=== 'Enter'){
                let nmessage = event.target.value;
                this.props.addMessage(nmessage);
                event.target.value ="";
            }
        }
        const changeUserInfo = evt => {
            if(evt.key === 'Enter'){
                console.log("changeUserInfo")
                let newValue = evt.target.value;
                this.props.changeStateName(newValue);
            }
        }
        // const userChange(event) {
        //         //part of a React controlled component to allow displayed user to update based on input
        //         this.setState({user: event.target.value});
        //       }
            
        
        
        return (
            <footer className ="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}  onKeyPress={changeUserInfo}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress ={handleKeyPress}/>
            </footer>
        );
    } 
}
    
export default ChatBar;