import { credentials } from '../../config';

export function fetchMessages() {
  return {
    type: "FETCH_MESSAGES",
    payload: [{id:1500905586989, sender:"johndoe", text:"Hello! How are you?", seenStatus:"img-notseen"},
              {id:1500905612388, sender:"johndoe", text:"This is John Doe.", seenStatus:"img-notseen"}],
  }
}

export function markAsRead() {
  return {
    type: 'MARK_AS_READ',
    payload: credentials.username,
  }
}


export function pushMessage(id, sender, text, seenStatus) {
  return {
    type: 'PUSH_MESSAGE',
    payload: {
      id,
      sender,
      text,
      seenStatus,
    },
  }
}
