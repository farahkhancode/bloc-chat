import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
render() {
   return (
     <div className="App">
       <RoomList firebase = {firebase}/>
     </div>
   );
 }
}


export default App;
