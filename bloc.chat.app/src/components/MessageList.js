import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

      this.state = {
        messages: [],
        content: '',
        roomId: null,
        sentAt: null,
        username: 'Guest'
      };

      this.chatMsg = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.chatMsg.orderByChild('sentAt').on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
    });
  }

  formatTime(msg) {
    let time = new Date(msg.sentAt).toLocaleTimeString();
    return time;
  }

  showMsg(msg) {
    if(msg.roomId == this.props.roomId)
      return (
        <div>
          <div>{msg.content}</div>
          <div>From: {msg.username} at {this.formatTime(msg)}</div>
        </div>
      )
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
      roomId: this.props.roomId,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.setUserId()
      }).then( () => this.setState({ content: '',
        roomId: null,
        sentAt: null,
        username: 'Guest'
      }));
  }

  render() {
    return(
      <div>
        <header className="msg-room-name">{this.props.activeRoom}</header>
        <div >
          {this.state.messages.map((msg,index) =>
            <div key={index} >
              {this.showMsg(msg)}
            </div>
            )
          }   
        </div>
        <input type='text' value={this.state.content} onChange={this.setMsgState.bind(this)} />
        <button type='submit' onClick={ (e) => { e.preventDefault(); this.sendMsg() } }>SEND</button>
      </div>
    )
  }
}

export default MessageList;