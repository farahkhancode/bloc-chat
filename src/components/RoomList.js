import React, { Component } from 'react';
import './../App.css';



class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
   this.roomsRef.on('child_added', snapshot => {
     const room = snapshot.val();
     room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
   });
 }

   handleChange(e){
   this.setState({newRoom: e.target.value});
 }

  handleSubmit(e){
    e.preventDefault();
  }

  createRoom() {
  this.roomsRef.push({
    name: this.state.newRoom
  });
   }


  render() {
    return (
    <section className="room-list">
     <ul className="rooms">
      {this.state.rooms.map((room, index)=> {return (
      <li key ={index}>{room.name}</li>
      )})}
     </ul>
     <form onSubmit={(e)=>this.handleSubmit(e)}>
     <label>
     New Room:
    <input type ="text" value={this.state.newRoom} onChange={(e)=> this.handleChange(e)}/>
    </label>
    <button type="submit" onClick={()=>this.createRoom()}>Create Room</button>
     </form>
    </section>
    );
  }
}


export default RoomList;
