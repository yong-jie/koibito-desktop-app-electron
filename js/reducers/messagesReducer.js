// retrieves from dispatch type
export default function reducer(state={
    // default state
    messages: [],
  }, action) {

    switch (action.type) {
      case "FETCH_MESSAGES": {
        return {
          ...state,
          messages: action.payload,
        };
      }

      case "MARK_AS_READ": {
        // get index of last sent message
        var index = state.messages.length-1;
        // make a copy of messages array so original is not manipulated
        var messagesUpdate = state.messages.slice();

        // update last sent message up to lastest unseen message to seen
        while (index >= 0) {
          var sender = messagesUpdate[index].sender;
          var seenStatus = messagesUpdate[index].seenStatus;

          // update to seen only if message not sent by user and is unseen
          if (sender !== action.payload) {
            if (seenStatus === "img-seen") {
              break;
            }
            else if (seenStatus === "img-notseen") {
              // elements in array copy still reference to original
              // create new object of original element + property change to assign into new
              var newMessage = Object.assign({}, messagesUpdate[index], { seenStatus: "img-seen" });
              messagesUpdate[index] = newMessage;
            }
          }
          // move on to previous message
          --index;
        }
        return {
          ...state,
          messages: messagesUpdate,
        };
      }

      case "PUSH_MESSAGE": {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      }
    }

    return state;
}
