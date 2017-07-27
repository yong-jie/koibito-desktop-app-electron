'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConnectionManager from '../connectionManager';

import * as MessagesActions from '../actions/messagesActions';

import TopMenu from './topMenu';
import MessagesView from './messages_view/messagesView';
import InputAndSend from './input/inputAndSend';

export class ChatWindow extends React.PureComponent {

  constructor() {
    super();
    //this.connectionManager = new ConnectionManager();
  
}
  componentWillUnmount() {
    //this.connectionManager.deinitialize();
  }

  render() {
    return (
      <div className="chat_window">
        {/*Menu bar (receiver's name, options, ...)*/}
        <TopMenu />
        {/*Message exchange display*/}
        <MessagesView messages={this.props.messages} messagesActions={this.props.messagesActions} />
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