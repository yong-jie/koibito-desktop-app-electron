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

/*
export default class MessageInput extends React.Component {
  constructor() {
    super();
  }

  
  onInput(e) {
    this.setState({inputMessage: e.target.innerHTML});
    this.props.setInputMessage(e.target.innerHTML);
  }
  

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!e.shiftKey) {
        e.target.innerHTML = '';
        this.props.onSendButtonPressed();
      } else {
        e.target.innerHTML = e.target.innerHTML + '\r\n';
        this.props.appendNewLine();
        e.target.scrollTop = e.target.scrollHeight;
      }
    }
  }

  render() {
    return (
      <textarea id="userInput" placeholder="Write a message..."></textarea>
    );
  }
}
*/



/* <textarea className="form-control" rows={1}
      onKeyPress={this.onKeyPress.bind(this)}
      onChange={this.onChange.bind(this)}
      value={this.props.message} ></textarea>
      */
/*
<div id="userInput"
      contentEditable="true"
      data-placeholder="Write a message..."
      onInput={this.onInput.bind(this)}
      onKeyPress={this.onKeyPress.bind(this)}>
      </div>
*/
