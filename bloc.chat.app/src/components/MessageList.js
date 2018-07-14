import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

      this.state = {
        messages: []
      };

      this.chatMsg = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.chatMsg.on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
    });
  }

  showMsg(msg) {
    if(msg.roomId == this.props.roomId)
      return msg.content;
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
      </div>
    )
  }
}

export default MessageList;