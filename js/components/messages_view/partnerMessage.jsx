'use babel';

import React from 'react';
import Timestamp from './timestamp';

export default class PartnerMessage extends Timestamp {

  render() {
    return (
      {/*includes text and timestamp*/},
      <li className="receiver_message">
        <div className="bubble">
          <span className="text">{this.props.message}</span>
          <span className="timestamp">{this.formatTimestamp()}</span>
        </div>
      </li>
    );
  }
}
