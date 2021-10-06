export const ACTIONS = {
    LOAD_ACCOUNTS: 'LOAD_ACCOUNTS',
    ADD_TRANSACTION: 'ADD_TRANSACTION',
};

// For our transaction's initial state, we are only beginning with one object in the array, with empty values.
const initialState = [{
    _id: '',
    accountNumber: '',
    currentBalance: '',
    availableBalance: '',
    transactions: [],
}];

// The account reducer allows various actions based on action type passed in to update the state in the store
function accountReducer(state = initialState, action) {
    switch (action.type) {
        // We load the account from the store
        case ACTIONS.LOAD_ACCOUNTS: {
            return ([...action.payload]);
        }
        // We add a new transaction to one or more accounts
        case ACTIONS.ADD_TRANSACTION: {
            // Techdebt: we are starting with two accounts from the database, and we simply replace them with 
            // final values post internal funds transfer here, instead of actually committing them back to the 
            // database or allowing for other accounts.
            return ([...action.payload]);
        }
        default:
            return state;
    }
}

export default accountReducer;