import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

      this.state = {
        messages: []
      };

      this.chatMsg = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.chatMsg.on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
    });
  }

  render() {
    return(<div></div>)
  }
}

export default MessageList;