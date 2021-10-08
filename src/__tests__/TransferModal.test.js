import { Provider } from "react-redux";
import configureStore from "../redux/store/config";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import testDataAccounts from "../data/testDataAccounts";
import { ACTIONS } from "../redux/reducers/accounts";
import TransferModal from "../components/TransferModal";

let store;

const onCloseFunc = jest.fn();

describe("Transfer Modal Post-Fetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore();
    store.dispatch({ type: ACTIONS.LOAD_ACCOUNTS, payload: testDataAccounts });
    jest.useFakeTimers();
  });
  it("renders component with fetched props from store and allows user actions", async () => {
    const { getByText, getByRole, getAllByRole } = render(
      <Provider store={store}>
        <TransferModal open={true} onClose={onCloseFunc} />
      </Provider>
    );

    // Check for the presence of the Dialog's text
    const isDialogTextPresent = await waitFor(() =>
      getByText(
        "Please select the bank account you would like to transfer from, the account you would like to transfer to, and then enter the amount."
      )
    );
    expect(isDialogTextPresent).toBeTruthy();

    // Check for 'Transfer' button and that it is disabled
    const isDialogTransferButtonDisabled = await waitFor(() =>
      getByRole("button", { name: "Transfer" })
    );
    expect(isDialogTransferButtonDisabled).toBeDisabled();

    // Open the first Select dropdown and click an account
    fireEvent.mouseDown(getAllByRole("button")[0]);
    const listbox = within(getByRole("listbox"));
    fireEvent.click(listbox.getByText(/209384839893/i));

    // Open the second Select dropdown and click an account
    fireEvent.mouseDown(getAllByRole("button")[1]);
    const listbox2 = within(getByRole("listbox"));
    fireEvent.click(listbox2.getByText(/726384839354/i));

    // Check for the Amount input to appear on-screen, with its initial helper text
    const isAmountRequiredInputPresent = await waitFor(() =>
      getByRole("textbox")
    );
    expect(
      getByText("Enter an amount less than your available balance.")
    ).toBeTruthy();

    // Change the input value from '' to 1, and check for helper text response for a value less than available balance
    fireEvent.change(isAmountRequiredInputPresent, { target: { value: "1" } });
    expect(
      getByText("Amount is less than your available balance.")
    ).toBeTruthy();

    // Change the input value from 1 back to '', and check for helper text response for input of an empty value
    fireEvent.change(isAmountRequiredInputPresent, { target: { value: "" } });
    expect(getByText("This field is required. Enter an amount.")).toBeTruthy();

    // Change the input value from '' to 100000, and check for helper text response for input of an amount exceeding current balance
    fireEvent.change(isAmountRequiredInputPresent, {
      target: { value: "1000000" },
    });
    expect(getByText("You have exceeded your available balance.")).toBeTruthy();

    // Change the input value from 100000 to 10, and check again for helper text response for a value less than available balance
    fireEvent.change(isAmountRequiredInputPresent, { target: { value: "10" } });
    expect(
      getByText("Amount is less than your available balance.")
    ).toBeTruthy();

    // Close the Dialog modal
    const isDialogTransferButtonPresent = await waitFor(() =>
      getByRole("button", { name: "Transfer" })
    );
    fireEvent.click(isDialogTransferButtonPresent);
  });
});
