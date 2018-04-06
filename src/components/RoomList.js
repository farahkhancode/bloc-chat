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
    this.deleteRoom = this.deleteRoom.bind(this);
  };


    componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(snapshot);
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
    if (!this.state.newRoom) { return }
  }

createRoom() {
    this.roomsRef.push({
      name: this.state.newRoom
  });
}

deleteRoom(roomKey) {
          const room = this.props.firebase.database().ref('rooms' + roomKey);
          const remainingRooms= this.state.rooms
          .filter(room => room.key !== roomKey);
          this.setState({ rooms: remainingRooms});
      }

  render() {
    return (
       <section className="room-list">
          <h2 className="app-title"> Bloc Chat </h2>
          <div className="rooms">
          <form className="createnew" onSubmit={this.handleSubmit}>
            <input type ="text" placeholder="New Room" value={this.state.newRoom} onChange={this.handleChange}/>
            <button type="submit"  onClick={this.createRoom}>Create</button>
          </form>
              <ul className="all-rooms">
                  {this.state.rooms.map((room, index)=> {return (
                  <section>
                  <div  key={room.key} onClick={(e)=>this.selectRoom(room, e)}>{room.name}</div>
                  <button className="delroom" onClick={() => this.deleteRoom(room.key)}>Remove</button>
                  </section>
                )})}
              </ul>
          </div>
      </section>
    );
  }
}

export default RoomList;
