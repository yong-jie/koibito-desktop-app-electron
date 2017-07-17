'use babel';

import React from 'react';
import autosize from 'autosize';


export default class MessageInput extends React.PureComponent {

  handleOnChange(e) {
    this.props.setInputMessage(e.target.value);
  }
  
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        this.enterPressed = true;
        e.preventDefault();
        this.props.onSendButtonPressed();
      } else {
        e.target.scrollTop = e.target.scrollHeight;
      }
    }
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }
  
  componentDidUpdate() {
    if (this.props.enterButtonPressed) {
      this.textarea.dispatchEvent(new Event('autosize:update'));
      this.textarea.focus();
      this.props.unsetEnterButtonPressed();
    }
  }

  render() {
    return (
      <textarea
      ref={c=>this.textarea=c}
      placeholder="Start typing..."
      rows={1}
      id="userInput"
      value={this.props.message}
      onChange={e=>this.handleOnChange(e)}
      onKeyPress={e=>this.handleKeyPress(e)} ></textarea>
    );
  }
}
