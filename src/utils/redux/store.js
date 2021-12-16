import { createStore, applyMiddleware } from "redux";

import reducers from "./reducers";

const reduxStore = createStore(reducers);

export default reduxStore;