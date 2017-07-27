import { combineReducers } from "redux"

import Messages from "./messagesReducer"
import Input from "./inputReducer"

export default combineReducers({
  Messages,
  Input,
})
