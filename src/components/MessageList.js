import React, { Component } from 'react';
import './../App.css';


class MessageList extends Component{
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      newMessage: '',
      username:'',
      content:'',
      sentAt:'',
      roomId:''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createNewMessage= this.createNewMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
 });
}

 handleChange(e){
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
  });
}

 handleSubmit(e){
     e.preventDefault();
   }

 createNewMessage(e) {
    e.preventDefault();
     this.messagesRef.push({
      sentAt: this.state.sentAt,
      username: this.state.username,
      roomId: this.state.roomId,
      content: this.state.content
   });
}


render() {
  const activeRoom = this.props.activeRoom;
  const messageList = this.state.messages
    .filter(message => message.roomId === activeRoom)
    .map(message => {
      return <li className="current-chat-message" key={message.key}> {message.username}  :  {message.content} </li>

    })
    return(
      <div className="chat-messages">
        <ul>{messageList} </ul>

        <form className="newmsgform" onSubmit={this.handleSubmit}>
          <input type ="text"
            name="newmessage"
            placeholder="New Message"
            value={this.state.content}
            onChange={this.handleChange}/>
          <button type="submit" onClick={this.createNewMessage}>Send</button>
        </form>

      </div>

  );
  }
}


export default MessageList;
