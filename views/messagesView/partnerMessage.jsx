'use babel';

import React from 'react';
import Message from './message.jsx';

export default class PartnerMessage extends Message {

  render() {
    return (
      <li className="receiver_message">
        <div className="bubble">
          <span className="text">{this.props.message}
          </span>
          <span className="timestamp">{this.formatTimestamp()}</span>
        </div>
      </li>
    );
  }

}