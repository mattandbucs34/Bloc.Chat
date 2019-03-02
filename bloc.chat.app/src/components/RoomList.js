import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room)});
    });

    this.roomsRef.on('child_removed', snapshot => {
      const delRoom = snapshot.val();
      delRoom.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== delRoom.key)});
      this.props.setActiveRoom(this.state.rooms[0].name);
      console.log(this.props.activeRoom);
    });
  }

  createRoomName(e) {
    this.setState({ newRoomName: e.target.value})
  }

  createRoom() {
    this.roomsRef.push( {
      name: this.state.newRoomName
      }).then( () => this.setState({ newRoomName: ''}));
  }

  deleteRoom(room) {
    if (this.state.rooms.length < 1) {
      document.getElementById('room-list').innerHTML = "There are no rooms. Create a room to begin chatting!";
    } else {
      this.roomsRef.child(room.key).remove();
    }
    
  }

  renameRoom(room) {
    console.log(room);
    let updateRoom = prompt('Enter new room name:','');
    if(updateRoom === null || updateRoom === '') {
      alert('Room Name has not been changed');
    } else {
      this.roomsRef.child(room.key).update({
        name: updateRoom
      });
    }
  }

  render() {
    return(
      <div>
      <div className='room-list' id='room-list'>
          {this.state.rooms.map((room, index) =>
            <button className={(room.name === this.props.activeRoom) ? "active-room" : "room-button"} 
                  key={index} 
                  onClick={ () => this.props.setActiveRoom(room.name) }>
              <div className='room-name'>{room.name}</div>
              <i className="ion-md-close-circle remove-icon" onClick={this.deleteRoom.bind(this, room)} role='button' />
              <i className='ion-md-create' onClick={() => this.renameRoom(room)} role='button'/>
            </button>
            )
          }
        </div>
        <form onSubmit={ (e) =>{ e.preventDefault(); this.createRoom() } } className='createRoom'>
          <p>
            <label htmlFor='create-room'>Create Room:</label>
          </p>
          <div>
            <input type='input' id='create-room' 
              value={this.state.newRoomName} 
              onChange={ this.createRoomName.bind(this)}
              autoComplete='off'
              />
          </div>
          <input type='submit' value="Create Room" className='btn create-room' />
        </form>
      </div>
    );
  }
    
}

export default RoomList;