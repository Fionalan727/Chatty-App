
import React,{Component} from 'react';


class Notification extends Component {
    
    render(){
        return (
            <div>
                 <div className="message system">
                    {this.props.message.content}
                </div>
            </div>
           
        );
    } 
}
    
export default Notification;