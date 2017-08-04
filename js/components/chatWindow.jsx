'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as MessagesActions from '../actions/messagesActions';

import TopMenu from './topMenu';
import MessagesView from './messages_view/messagesView';
import InputAndSend from './input/inputAndSend';

var isFocused = "true";

export class ChatWindow extends React.PureComponent {

  componentDidMount() {
    // update messages' seen status to seen upon every window focus
    const { messagesActions } = this.props;
    window.addEventListener("focus", function(event) {
      messagesActions.markAsRead();
      isFocused = "true";
    });
    window.addEventListener("blur", function(event) {
      isFocused = "false";
    });
  }

  render() {
    return (
      <div className="chat_window">
        {/*Menu bar (receiver's name, options, ...)*/}
        <TopMenu />
        {/*Message exchange display*/}
        <MessagesView isFocused={isFocused} messages={this.props.messages} messagesActions={this.props.messagesActions} />
        {/*Text message input field and send button*/}
        <InputAndSend messagesActions={this.props.messagesActions} />
      </div>
    );
  }
}

// connect renders the chatWindow component while injecting props into it
export default connect((store) => {
  return {
    messages: store.Messages.messages,
  };
}, (dispatch) => {
  return {
    messagesActions: bindActionCreators(MessagesActions, dispatch)
  };
})(ChatWindow);
