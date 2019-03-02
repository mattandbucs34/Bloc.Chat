import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import SendMessage from './components/SendMessage';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDuELVYsbEg20n2acmwcP47j56kqRiyYsI",
  authDomain: "blocchat-mattyj.firebaseapp.com",
  databaseURL: "https://blocchat-mattyj.firebaseio.com",
  projectId: "blocchat-mattyj",
  storageBucket: "blocchat-mattyj.appspot.com",
  messagingSenderId: "762483820918"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: 'Room 1',
      userId: 'Guest'
    }
  }

  setActiveRoom(roomName) {
    this.setState({ activeRoom: roomName});
  }

  setActiveKey(activeKey) {
    this.setState({ roomId: activeKey });
  }

  setUser (user) {
    this.setState({ userId: user})
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <div className='row'>
          <div className='col-3 menu'>
            <User
              firebase={firebase}
              userId={this.state.userId}
              setUser={(e) => this.setUser(e)}
            />
            <RoomList 
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              roomId={this.state.roomId}
              setActiveRoom={ (e) => this.setActiveRoom(e)}
              setActiveKey={ (e) => this.setActiveKey(e)}
            />
          </div>
          <div className='col-8'>
            <MessageList 
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              roomId={this.state.roomId}
              userId={this.state.userId}
            />
            <SendMessage
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              roomId={this.state.roomId}
              userId={this.state.userId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
