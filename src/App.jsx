import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
      // let numUser=Number(event.data);
      // this.setState=({usersLoggedIn: incoming.loggedIn})
      let serverMessage = JSON.parse(event.data);
      console.log(serverMessage)

      if(Object.keys(serverMessage).includes("usersLoggedIn")){
        this.setState({usersLoggedIn: serverMessage.usersLoggedIn})
      }else{
        let updateMessage = [...this.state.messages, serverMessage]
        this.setState({messages : updateMessage});
      }
      
      
    }
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  addMessage=(message)=>{
    
    const newMessage = {
      type:"postMessage",
      username: this.state.currentUser.name,
      content:message,

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
        <a href="/" className="navbar-brand">Chatty</a>
        <span>{this.state.usersLoggedIn}people has been loki'd</span>
        </nav>
        
        <MessageList messages ={this.state.messages}/>
        <ChatBar currentUser ={this.state.currentUser.name} changeStateName={this.changeStateName} addMessage={this.addMessage}/>
      
      </div>
    );

  }
}
export default App;

