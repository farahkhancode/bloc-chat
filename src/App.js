import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


var config = {
  apiKey: "AIzaSyDa1WlNms3Esx6pVWf6KMgxVrb6wOJs9wA",
  authDomain: "bloc-chat-23568.firebaseapp.com",
  databaseURL: "https://bloc-chat-23568.firebaseio.com",
  projectId: "bloc-chat-23568",
  storageBucket: "bloc-chat-23568.appspot.com",
  messagingSenderId: "323263946081"
};

firebase.initializeApp(config);

class App extends Component {
    constructor(props){
      super(props);

      this.state ={
        activeRoom : '',

      };

      this.setActiveRoom = this.setActiveRoom.bind(this);

    }

setActiveRoom(room){
  this.setState({activeRoom :room})
  console.log(room);
}

setUser(user){
  this.setState({ user : user})
}

render() {
   const displayMessages = this.state.activeRoom;

   return (
     <div className="App">
        <aside className="rooms-list">
          <RoomList firebase={firebase} activeRoom={this.setActiveRoom} />
        </aside>
        <div >
            <main className="active-chat-room">
            <h2>{this.state.activeRoom.name}</h2>

              {displayMessages ?

                (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} />)
                : (null)
              }
            </main>
        </div>
     </div>
     
   );
 }
}


export default App;
