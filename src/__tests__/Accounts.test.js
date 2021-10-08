import { Provider } from "react-redux";
import configureStore from "../redux/store/config";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Accounts from "../components/Accounts";

let store;

describe("Accounts Pre-Fetch", () => {
  beforeEach(() => {
    store = configureStore();
  });
  it("renders component with initial props", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Accounts />
      </Provider>
    );

    // Check for presence of 'Account Loading' message
    const isAccountLoadingPresent = await waitFor(() =>
      getByText("Accounts loading...")
    );

    expect(isAccountLoadingPresent).toBeTruthy();
  });
});
