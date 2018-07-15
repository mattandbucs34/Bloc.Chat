import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged ( userId => {
      this.props.setUser(userId);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  showUser(userId) {
    if(userId === null)
      return "Guest";
    else
      return userId.displayName; 
  }

  render () {
    return(
      <div>
        {this.showUser(this.props.userId)}
        <div>
          <button onClick={ () => this.signIn()}>Sign In</button>
        </div>
        <div>
          <button onClick={ () => this.signOut()}>Sign Out</button>
        </div>
      </div>
    )
  }
}

export default User;