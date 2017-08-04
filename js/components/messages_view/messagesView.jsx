'use babel';

import React from 'react';
import PartnerMessage from './partnerMessage';
import UserMessage from './userMessage';

import { credentials } from '../../../config';

export default class MessagesView extends React.PureComponent {

  componentWillMount() {
    // update view whenever new messages come in
    const { messagesActions } = this.props;
    messagesActions.fetchMessages();
  }

  componentWillUpdate() {
    // check if user is scrolled to bottom
    // Add 29 to even out offsetHeight to full height when userInput is at max height
    if (this.div.scrollTop + this.div.offsetHeight + 29 >= this.div.scrollHeight) {
      this.scrollToTheBottom = true;
    }
  }

  componentDidUpdate() {
    // auto scroll to bottom if user is already at bottom
    if (this.scrollToTheBottom) {
      this.div.scrollTop = this.div.scrollHeight;
      this.scrollToTheBottom = false;
    }
  }

  render() {
    const { messages } = this.props;
    const mappedMessages = messages.map(message => (message.sender === credentials.username?
                                                    <UserMessage key={message.id} message={message.text} seenStatus={message.seenStatus} />:
                                                    <PartnerMessage key={message.id} message={message.text} />));

    return (
      <div className="messages_view" ref={c=>this.div=c}>
        <ul>{ mappedMessages }</ul>
      </div>
    );
  }
}
