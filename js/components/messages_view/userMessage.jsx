'use babel';

import React from 'react';
import Timestamp from './timestamp';

export default class UserMessage extends Timestamp {

  render() {
    return (
      {/*includes text, timestamp, seen status and display picture*/},
      <li className="sender_message">
        <div className="bubble">
          <span className="text">{this.props.message}</span>
          <span className="timestamp">{this.formatTimestamp()}&nbsp;
            {/*src is a base-64 encoded transparent PNG file*/}
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABlJREFUeNpjYBgFo2AUjIJRMApGwSigLwAACIAAAcNXzB0AAAAASUVORK5CYII=" className="img-seen" />
          </span>
        </div>
        <img src="img/default.jpg" className="avatar" />
      </li>
    );
  }
}
