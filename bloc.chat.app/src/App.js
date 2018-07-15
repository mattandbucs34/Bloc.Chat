import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User'; 


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
      activeRoom: '',
      roomId: '',
      userId: ''
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
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        
        <main>
          <div>
            <table className='msg-table'>
              <tbody>
                <tr>
                  <td>
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
                    </td>
                    <td className='msg-block'>
                      <MessageList 
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                        roomId={this.state.roomId}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
