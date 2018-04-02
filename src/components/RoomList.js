import React, { Component } from 'react';
import './../App.css';



class RoomList extends Component {
  constructor(props) {
      super(props);

      this.state = {
      rooms: [],
      newRoom: '',

    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createRoom = this.createRoom.bind(this);
  };

    componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
   });

 }

selectRoom(key){
   this.props.activeRoom(key);
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
    const activeRoom =this.props.activeRoom;
    return (
       <section className="room-list">
          <h2 className="app-title"> Bloc Chat </h2>
          <div className="rooms">
          <form onSubmit={this.handleSubmit}>
            <input type ="text" value={this.state.newRoom} onChange={this.handleChange}/>
            <button type="submit" onClick={this.createRoom}>Create Room</button>
          </form>
              <ul>
                  {this.state.rooms.map((room, index)=> {return (
                  <li key={room.key} onClick={(e)=>this.selectRoom(room, e)}>{room.name}</li>
                )})}
              </ul>
          </div>
      </section>
    );
  }
}


export default RoomList;
