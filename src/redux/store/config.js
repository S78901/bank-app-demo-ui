import { createStore, compose } from "redux";
import rootReducer from "../reducers/rootReducer";

// Enable Redux Dev Tools if installed
const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.() || compose;

// Configure the Redux store
const configureStore = () => {
    const store = createStore(rootReducer(), enableReduxDevTools);
    console.log(store.getState());
    return store;
}

export default configureStore;