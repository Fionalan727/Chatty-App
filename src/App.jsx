import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usersLoggedIn: 0

    };
    this.socket = new WebSocket('ws://localhost:3001');
  }
  
  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Browser client connected');
    };
    this.socket.onmessage = (event) => {
      let serverMessage = JSON.parse(event.data);
      console.log(serverMessage)

      if (Object.keys(serverMessage).includes("loggedIn")) {
        //if someone just opened a new client in the browser, set the state to the random color that was assigned by the server.  if someone closed the client, they won't be assigned a color b/c the server won't send a color to the client to be updated
        this.setState({usersLoggedIn: serverMessage.loggedIn});
        if (!this.state.color) {
          this.setState({color: serverMessage.color});
        }
      }else if (typeof serverMessage !== "object") {
        //if someone closes the client, only a number is sent back by the server, so just update the usersLoggedIn to the number of users sent back by the server
          let num_of_users = Number(event.data);
          this.setState({usersLoggedIn: num_of_users});
      }else{
        let updateMessage = [...this.state.messages, serverMessage]
        this.setState({messages : updateMessage});
      }
      
      
    }
    console.log("componentDidMount <App />");
  }

  addMessage=(message)=>{
    
    const newMessage = {
      type:"postMessage",
      username: this.state.currentUser.name,
      content:message,
      color: this.state.color
    }

    console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage))
    
    
    // this.setState({messageState});
  }
  changeStateName = (info) => {
    let noti = {
      "type": "postNotification", 
      "content": `${this.state.currentUser.name} has changed their name to ${info}.`
    }
    this.setState({ currentUser: { name: info } })
    this.socket.send(JSON.stringify(noti))
    
  }

  render() {
    
    return (
      <div>
        <nav className="navbar">
        <span className="logo"><img src="/styles/loki.png" alt=""/></span>
        <a href="/" className="navbar-brand">Scepter</a>
        <span className="userlogin">{this.state.usersLoggedIn} people has been loki'd</span>
        </nav>
        
        <MessageList messages ={this.state.messages}/>
        <ChatBar currentUser ={this.state.currentUser.name} changeStateName={this.changeStateName} addMessage={this.addMessage}/>
      
      </div>
    );

  }
}
export default App;

