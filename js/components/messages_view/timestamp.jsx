import React from 'react';

export default class Timestamp extends React.PureComponent {
  
  // TODO: move to separate module.
  // for separating chat bubbles upon a new day
  formatDatestamp() {
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${dayName}, ${day} ${month}`;
  }

  // for timestamp in chat bubbles
  formatTimestamp() {
    const date = new Date();
    // 12h instead of 24h, with 12 instead of 0
    const hour = date.getHours() % 12 || 12;
    // add 0 to mins < 10, so 2:06 instead of 2:6
    const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM':'AM';

    return `${hour}:${minutes}${ampm}`;
  }
}