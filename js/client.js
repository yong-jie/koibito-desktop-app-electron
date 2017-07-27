import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import ChatWindow from './components/chatWindow';
import store from "./store";

const app = document.getElementById('app');

// provider requires a store
window.onload = function() {
  ReactDOM.render(
    <Provider store={store}>
      <ChatWindow />
    </Provider>, app);
}
