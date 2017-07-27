'use babel';

import React from 'react';

export default class TopMenu extends React.PureComponent {

  render() {
    return (
      <div className="top_menu">
        <img src="./img/default.jpg" className="avatar" />
        <div className="details">
          <div className="title">John Doe</div>
          <div className="status">online</div>
        </div>
      </div>
    );
  }
}
