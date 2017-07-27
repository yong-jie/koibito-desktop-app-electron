export function fetchMessages() {
  return {
    type: "FETCH_MESSAGES",
    payload: [{id:1500905586989, sender:"johndoe", text:"Hello! How are you?"},
              {id:1500905612388, sender:"johndoe", text:"This is John Doe."}],
  }
}

export function pushMessage(id, sender, text) {
  return {
    type: 'PUSH_MESSAGE',
    payload: {
      id,
      sender,
      text,
    },
  }
}
