'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autosize from 'autosize';

import * as InputActions from '../../actions/inputActions';

import { credentials } from '../../../config';

export class InputAndSend extends React.PureComponent {

  constructor() {
    super();
    this.newMessagePushed = false;
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  componentDidUpdate() {
    // manual textarea size update upon inputText reset
    if (this.newMessagePushed) {
      autosize.update(this.textarea);
      this.newMessagePushed = false;
    }
  }

  // update inputText state
  handleChange(event) {
    const { inputActions } = this.props;
    inputActions.updateInput(event.target.value);
  }

  // detect keyboard input
  handleKeyPress(event) {
    // push message upon enter key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.pushMessage();
    }
  }

  pushMessage() {
    const { inputText } = this.props;
    // prevent message sending if no input visible
    if (inputText !== '') {
      const { messagesActions } = this.props;
      messagesActions.pushMessage(new Date().getTime(), credentials.username, inputText, "img-notseen");
      this.newMessagePushed = true;
      // reset input state to blank string
      const { inputActions } = this.props;
      inputActions.updateInput('');
    }
    this.textarea.focus();
  }

  render() {
    return (
      <div className="bottom_wrapper">
        <textarea
        ref={input => this.textarea = input}
        id="userInput"
        rows={1}
        placeholder="Write a message..."
        value={this.props.inputText}
        onChange={event => this.handleChange(event)}
        onKeyPress={event => this.handleKeyPress(event)}>
        </textarea>
        
        <button id="sendBtn" onClick={()=>this.pushMessage()}>Send</button>
      </div>
    );
  }
}

// connect renders the InputAndSend component while injecting props into it
export default connect((store) => {
  return {
    inputText: store.Input.inputText,
  };
}, (dispatch) => {
  return {
    inputActions: bindActionCreators(InputActions, dispatch)
  };
})(InputAndSend);
