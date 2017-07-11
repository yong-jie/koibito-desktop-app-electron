'use babel';

import React from 'react';

export default class MessageInput extends React.Component {
  buttonPressed() {
    this.props.onSendButtonPressed();
  }

  render() {
    return (
      <button id="sendBtn" onClick={()=>this.buttonPressed()}>Send</button>
    );
  }
}
