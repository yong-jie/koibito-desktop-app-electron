import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from '../views/chatWindow.jsx';

window.onload = function(){
  ReactDOM.render(<ChatWindow />, document.getElementById('app'));
}