import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/reducers/accounts";
import axios from 'axios';

// Action to get the accounts documents from the 'bank' collection in the MongoDB database, via the mock server.
function useGetAccount() {
    // Use the useDispatch hook from React-Redux
    const dispatch = useDispatch();
    // Use the useSelector hook from React-Redux to load the accounts state
    const accountData = useSelector((state) => state.accounts);

    // This references the localhost port and endpoint for the mock server
    const url = process.env.REACT_APP_API_URI;

    // Check whether the accounts have been loaded yet by whether the initial Redux state is still there
    if(accountData[0]?.accountNumber === "") {

        // Fetch the data from the endpoint using Axios
        console.log("Fetching...")
        axios.get(url).then((data) => {
            // Dispatch the data to our store using the 'LOAD_ACCOUNTS' action for the accounts reducer
            dispatch({
                type: ACTIONS.LOAD_ACCOUNTS,
                payload: data.data,
            });
        }).catch((error) => {
            // Catch any errors
            console.log(error);
        });
    }
}

export default useGetAccount;