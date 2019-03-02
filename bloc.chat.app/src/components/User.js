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

  showSignBtn(userId) {
    if(userId === null) {
      return (
        <div>
          <button onClick={ () => this.signIn()} className='btn'>Sign In</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={ () => this.signOut()} className='btn'>Sign Out</button>
        </div>
      );
    }
  }

  render () {
    return(
      <div className='user-div'>
        <p className='welcome'>Welcome {this.showUser(this.props.userId)}!</p>
        <div>{this.showSignBtn(this.props.userId)}</div>
      </div>
    )
  }
}

export default User;