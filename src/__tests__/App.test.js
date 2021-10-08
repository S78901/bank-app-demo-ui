import { Provider } from "react-redux";
import configureStore from "../redux/store/config";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import testDataAccounts from "../data/testDataAccounts";
import { ACTIONS } from "../redux/reducers/accounts";

import App from "../App";

let store;

describe("App Post-Fetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore();
    store.dispatch({ type: ACTIONS.LOAD_ACCOUNTS, payload: testDataAccounts });
    jest.useFakeTimers();
  });
  it("renders component with fetched props from store", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check for presence of 'Bank Demo App' title
    const isTitlePresent = await waitFor(() => getByText("Bank Demo App"));
    expect(isTitlePresent).toBeTruthy();

    // Check for presence of 'Transfer Funds' button
    const isTransferButtonPresent = await waitFor(() =>
      getByText("Transfer Funds")
    );
    expect(isTransferButtonPresent).toBeTruthy();
  });
});
