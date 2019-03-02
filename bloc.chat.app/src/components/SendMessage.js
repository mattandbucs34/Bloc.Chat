import React, { Component } from 'react';

class SendMessage extends Component {
  constructor(props) {
    super(props);

      this.state = {
        messages: [],
        content: '',
        roomId: null,
        sentAt: null,
        username: 'Guest'
      };

      this.chatMsg = this.props.firebase.database().ref('Messages' );
  }

  setMsgState(e) {
    this.setState({ content: e.target.value})
  }

  setUserId() {
    if(this.props.userId === null){
      return 'Guest';
    }else {
      return this.props.userId.displayName;
    }
  }

  sendMsg() {
    this.chatMsg.push( {
      content: this.state.content,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.setUserId()
      }).then( () => this.setState({ content: '',
        roomId: null,
        sentAt: null,
        username: ''
      }));
  }

  render() {
    return(
      <div className='msg-form'>
          <form onSubmit={ (e) => { e.preventDefault(); this.sendMsg() } } >
            <input type='text' value={this.state.content} onChange={this.setMsgState.bind(this)} id='msg-input' autoComplete='off' />
            <button type='submit'>SEND</button>
          </form>
        </div>
    );
  }

}

export default SendMessage;