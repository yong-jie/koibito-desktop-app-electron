'use babel';

import React from 'react';

export default class Message extends React.PureComponent {
  formatTimestamp() {
    const date = new Date(this.props.time);
    const hour = date.getHours()>12?date.getHours()-12:date.getHours();
    const minute = date.getMinutes();
    const ampm = date.getHours()>12?'PM':'AM';
    return `${hour}:${minute}${ampm}`;
  }
}