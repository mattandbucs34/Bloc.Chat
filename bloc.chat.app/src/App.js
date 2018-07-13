import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
        </main>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
