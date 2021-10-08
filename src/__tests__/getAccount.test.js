import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import Accounts from "../components/Accounts";
import App from "../App";
import testDataAccounts from "../data/testDataAccounts";
import { Provider } from "react-redux";
import configureStore from "../redux/store/config";

// Set the mockClear() to trigger after each test
afterEach(() => {
  axios.get.mockClear();
});

// Set the URL we will check to see whether it was called correctly
const url = process.env.REACT_APP_API_URI;

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

// Test the loading state
describe("getAccount action", () => {
  it("shows loading while fetching data", () => {
    mockCall();

    const { getByText } = render(
      <Provider store={store}>
        <Accounts />
      </Provider>
    );
    expect(getByText(/Accounts Loading.../i)).toBeInTheDocument();
  });

  // Test the data load in the UI
  it("renders transaction data in the UI", async () => {
    mockCall();

    const { getAllByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check for the render of the table values on the first page
    const trValues = await waitFor(() =>
      getAllByTestId("tr-transactions").map((tr) => tr.textContent)
    );
    expect(trValues).toEqual([
      "10/05/2021 5:03:15 pmdebitPAYPAL-£7.80GBP",
      "10/03/2021 7:04:11 amcreditMARKETWAGON REFUND+€76.21EUR",
      "10/02/2021 6:01:01 pmdebitAMAZON-$26.30USD",
    ]);

    // Check that Axios was called & used with the correct URL
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});
