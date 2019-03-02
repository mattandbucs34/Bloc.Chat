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
    this.chatMsg.orderByChild('roomId').equalTo(this.props.activeRoom).on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.activeRoom !== prevProps.activeRoom) {
      this.chatMsg.orderByChild('roomId').equalTo(this.props.activeRoom).on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
      });
    }
  }


  formatTime(msg) {
    let time = new Date(msg.sentAt).toLocaleString();
    return time;
  }

  setMsgClass(msg) {
    if(msg.username === this.props.userId)
      return 'user-msg';
    else 
      return 'msg-row';
  }

  showMsg(msg, index) {
    if(msg.roomId === this.props.activeRoom )
      return (
        <div key={index} >
          <div className={this.setMsgClass(msg)}>
            <div className='msg-text'>{msg.content}</div>
            <div className='msg-sender'>From: {msg.username} at {this.formatTime(msg)}</div>
          </div>
        </div>
      )
  }

  render() {
    return(
      <div>
        <div className='room-header'>
            <header className="msg-room-name">{this.props.activeRoom}</header>
        </div>
        <div className='msg-container'>
          {this.state.messages.map((msg,index) =>
            this.showMsg(msg,index)
            )
          }
        </div>
      </div>
    )
  }
}

export default MessageList;