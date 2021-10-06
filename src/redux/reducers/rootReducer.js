import { combineReducers } from "redux";
import accountReducer from "./accounts";

// Should further reducers need to be utilized, we can combine them here in the Root Reducer. As-is, 
// we only have  'accounts'.
function rootReducer() {
    return combineReducers({
        accounts: accountReducer,
    })
}

export default rootReducer;