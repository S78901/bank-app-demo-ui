import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import App from "../App";
import testDataAccounts from "../data/testDataAccounts";
import { Provider } from "react-redux";
import configureStore from "../redux/store/config";

// Set the mockClear() to trigger after each test
afterEach(() => {
  axios.get.mockClear();
});

// Set up a mock call to axios, using our fake axios handler from __mocks__ folder
function mockCall() {
  axios.get.mockResolvedValueOnce({
    data: testDataAccounts,
  });
}

// Initialize the store, then set it
let store;

beforeEach(() => {
  store = configureStore();
});

// Test the data load in the UI
describe("BasePage Post-Fetch", () => {
  it("click the transfer button, open the modal, and close it", async () => {
    mockCall();
    const { getByText, queryByText, getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check for the render of the table title on the first page
    const isTransactionsPresent = await waitFor(() =>
      getByText("Transactions:")
    );
    expect(isTransactionsPresent).toBeTruthy();

    // Check for, and click, the Transfer Funds button
    const isTransferButtonPresent = await waitFor(() =>
      getByRole("button", { name: "Transfer Funds" })
    );
    fireEvent.click(isTransferButtonPresent);

    // Check for the presence of the Dialog's text
    const isDialogTextPresent = await waitFor(() =>
      getByText(
        "Please select the bank account you would like to transfer from, the account you would like to transfer to, and then enter the amount."
      )
    );
    expect(isDialogTextPresent).toBeTruthy();

    // Close the Dialog modal
    const isDialogCancelButtonPresent = await waitFor(() =>
      getByRole("button", { name: "Cancel" })
    );
    fireEvent.click(isDialogCancelButtonPresent);
  });
});
