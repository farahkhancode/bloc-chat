import React, { Component } from 'react';
import './../App.css';
import * as firebase from 'firebase';

class User extends Component{
  constructor(props){
    super(props);


    this.signIn= this.signIn.bind(this);
};

 componentDidMount() {
   this.props.firebase.auth().onAuthStateChanged( user => {
     this.props.setUser(user);
   });
 }

signIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
  console.log("logged in");

}

signOut(){
  this.props.firebase.auth().signOut();
}


render (){

  return(
 <button onClick={this.signIn}>'Log In'</button>
 <button onClick={this.signOut}>'Log Out'</button>

  )
}


export default MessageList;
