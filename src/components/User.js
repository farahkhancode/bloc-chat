import React, { Component } from 'react';
import './../App.css';
import * as firebase from 'firebase';

class User extends Component{
  constructor(props){
    super(props);


    this.signIn= this.signIn.bind(this);
    this.signOut= this.signOut.bind(this);
};

 componentDidMount() {
   this.props.firebase.auth().onAuthStateChanged( user => {
     this.props.setUser(user);
   });
 }

signIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider).then((result) => {
    const user = result.user;
    this.props.setUser(user);
  console.log("logged in");
})

}

signOut(){
  this.props.firebase.auth().signOut().then((result) => {
      console.log("logged out");
      this.props.setUser(null);
        })
}


render (){
  const activeUser = this.props.user
  return(
    <section>
      <div>
        <h3> Welcome, {this.props.activeUser}!</h3>

        {this.props.activeUser === 'Guest' ?
          <button onClick={this.signIn}>Log In</button>
          :
          <button onClick={this.signOut}>Log Out</button>
        }
      </div>
   </section>
 );
}

}

export default User;
