'use babel';

import React from 'react';
import Message from './message.jsx';

export default class UserMessage extends Message {


  render() {
    return (
      <li className="sender_message">
        <div className="bubble">
          <span className="text">{this.props.message}</span>
          <span className="timestamp">{this.formatTimestamp()}
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABlJREFUeNpjYBgFo2AUjIJRMApGwSigLwAACIAAAcNXzB0AAAAASUVORK5CYII=" className="img-seen" />
          </span>
        </div>
        <img src="img/default.jpg" className="avatar" />
      </li>
    );
  }
}