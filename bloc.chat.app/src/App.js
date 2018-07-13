import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


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
      activeRoom: ''
    }
  }


  setActiveRoom(roomName) {
    this.setState({ activeRoom: roomName});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        
        <main>
          <div>
            <RoomList 
              firebase={firebase}
              activeRoom={this.state.activeRoom}
            />
          </div>
          <div>
            <MessageList 
              firebase={firebase}
              activeRoom={this.state.activeRoom}
            />
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
