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
      case "PUSH_MESSAGE": {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      }
    }

    return state;
}
