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
  }

  createRoomName(e) {
    console.log(e.target.value);
    this.setState({ newRoomName: e.target.value})
  }

  createRoom() {
    this.roomsRef.push( {
      name: this.state.newRoomName
      }).then( () => this.setState({ newRoomName: ''}));
  }

  render() {
    return(
      <section className = 'roomlist'>
        {this.state.rooms.map((room, index) =>
          <div className="room-name" key={index} onClick={ () => this.props.setActiveRoom(room.name)}>{room.name}</div>
          )
        }
        <form onSubmit={ (e) =>{ e.preventDefault(); this.createRoom() } }>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor='create-room'>Create Room:</label></td>
              </tr>
              <tr>
                <td><input type='input' id='create-room' value={this.state.newRoomName} onChange={ this.createRoomName.bind(this)} /></td>
              </tr>
            </tbody>
          </table>
          <input type='submit' value="Create Room" />
        </form>
      </section>
    );
  }
    
}

export default RoomList;