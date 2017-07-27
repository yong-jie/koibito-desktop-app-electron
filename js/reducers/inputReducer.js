// retrieves from dispatch type
export default function reducer(state={
   // default state
    inputText: '',
  }, action) {

    switch (action.type) {
      case "UPDATE_INPUT": {
        return {
          ...state,
          inputText: action.payload,
        };
      }
    }

    return state;
}
