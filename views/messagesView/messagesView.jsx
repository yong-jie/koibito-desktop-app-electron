'use babel';

import React from 'react';
import PartnerMessage from './partnerMessage.jsx';
import UserMessage from './userMessage.jsx';

export default class MessagesView extends React.PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps) return true;
    return false;
  }

  componentWillUpdate() {
    // Add 29 to even out offsetHeight to full height when userInput is at max height
    if (this.div.scrollTop + this.div.offsetHeight + 29 >= this.div.scrollHeight) {
      this.scrollToTheBottom = true;
    }
  }

  componentDidUpdate() {
    if (this.scrollToTheBottom) {
      this.div.scrollTop = this.div.scrollHeight;
      this.scrollToTheBottom = false;
    }
  }
  
  render() {
    return (
      <div className="messages_view" ref={c=>this.div=c}>
      <ul>
        {this.props.messages}
      </ul>
    </div>
    );
  }
}
