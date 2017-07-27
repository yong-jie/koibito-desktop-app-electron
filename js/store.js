import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk"; // to handle async actions

import reducer from "./reducers"; // combined reducers

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducer, middleware);
