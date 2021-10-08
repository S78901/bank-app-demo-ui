import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/reducers/accounts";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function TransferModal({ open, onClose}) {
    const dispatch = useDispatch();
    const accountData = useSelector((state) => state.accounts);

    const initialTransactionValueState = {
        description: 'INTERNAL TRANSFER',
        amount: '',
        currency: 'USD',
    }

    const [accountFrom, setAccountFrom] = useState('');
    const [secondaryAccounts, setSecondaryAccounts] = useState([]);
    const [accountTo, setAccountTo] = useState('');
    const [transactionValues, setTransactionValues] = useState(initialTransactionValueState);
    const [amountError, setAmountError] = useState(false);
    const [amountHelperMsg, setAmountHelperMsg] = useState("Enter an amount less than your available balance.");

    // Event handler for the first dropdown
    const handleChangeSelect1 = (event) => {
        let selectedAccount = event.target.value;
        setAccountFrom(selectedAccount);

        // Create an array from secondary accounts available for the next dropdown. If user de-selects 
        // an option in the first dropdown, clear the choice from the second dropdown as well + set the
        // secondaryAccounts array to empty so the second dropdown is not shown
        let arr = [];
        if (secondaryAccounts.includes(selectedAccount)) {
            setAccountTo('');
        }
        if (selectedAccount !== '') {
            accountData.map((account, i) => {
                if (account.accountNumber !== selectedAccount) {
                    return arr.push(account.accountNumber);
                }
                return null;
            });
        } else {
            setAccountTo('');
        }
        setSecondaryAccounts(arr);
    };

    // Event handler for the second dropdown
    const handleChangeSelect2 = (event) => {
        setAccountTo(event.target.value);
    };

    // Only allow numbers and a decimal dot 
    const validateInput = (prop) => {
        let rgx = /^[0-9]*\.?[0-9]*$/;
        return prop.match(rgx);
    }

    // Event handler for the Amount field, including validation
    const handleInputChange = (prop) => (event) => {
        let newAmount = event.target.value;
        let selectedAccount = accountData.find(account => account.accountNumber === accountTo);
        let amountUnderAvailableBalance = Number(selectedAccount.availableBalance) >= Number(newAmount); 
        // First, validate input via REGEX
        if (validateInput(newAmount)) {
            setTransactionValues({ ...transactionValues, [prop]: newAmount });
            if (!newAmount) {
                setAmountHelperMsg("This field is required. Enter an amount.")
                setAmountError(true);
            } else if (!amountUnderAvailableBalance) {
                setAmountError(true);
                setAmountHelperMsg("You have exceeded your available balance.")
            }
            else {
                setAmountHelperMsg("Amount is less than your available balance.")
                setAmountError(false);
            }
        }

    };

    const resetInitialValues = () => {
        setAccountFrom('')
        setAccountTo('');
        setSecondaryAccounts([]);
        setAmountError(false);
        setTransactionValues(initialTransactionValueState);
    }

    // Close the dialog and reset the form
    const handleCancel = () => {
        onClose();
        resetInitialValues();
    };

    // Transfer the funds (this only updates our local Redux store, not the actual database.)
    const transferFunds = () => {
        let initialAccount = accountData.find(account => account.accountNumber === accountFrom)
        let selectedAccount = accountData.find(account => account.accountNumber === accountTo);

        // Create the new objects for the updated account data.
        let updatedInitialAccount = (
            {
                _id: initialAccount._id, 
                accountNumber: accountFrom, 
                currentBalance: `${(Number(selectedAccount.currentBalance) - Number(transactionValues.amount))}`, 
                availableBalance: `${(Number(selectedAccount.availableBalance) - Number(transactionValues.amount))}`, 
                transactions: [
                    { timestamp: new Date().toISOString(), action: "debit", ...transactionValues }, 
                    ...initialAccount.transactions
                ]
            }
        );

        let updatedSelectedAccount = (
            {
                _id: selectedAccount._id, 
                accountNumber: accountTo, 
                currentBalance: `${(Number(selectedAccount.currentBalance) + Number(transactionValues.amount))}`, 
                availableBalance: `${(Number(selectedAccount.availableBalance) + Number(transactionValues.amount))}`, 
                transactions: [
                    { timestamp: new Date().toISOString(), action: "credit", ...transactionValues }, 
                    ...selectedAccount.transactions
                ]
            }
        );

        // TECHDEBT: This is where a different action should be utilized, such as getAccount, but to push 
        // back to the database. Since I don't actually want to over-write the database start values, this 
        // is omitted.
        // This does enable to user to simply re-load the app and start over where they began, free to make
        // any transactions again.

        dispatch({
            type: ACTIONS.ADD_TRANSACTION,
            payload: [updatedInitialAccount, updatedSelectedAccount],
        });

        // Close the dialog and reset the values, so the next time the form is opened the user can start over.
        onClose();
        resetInitialValues();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Transfer Funds</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please select the bank account you would like to transfer from, the account you would like to transfer to, and then enter the amount.
                </DialogContentText>
                <FormControl sx={{ my: 3, minWidth: '100%' }}>
                    <InputLabel id="from-account-helper-label">From Account...</InputLabel>
                        <Select
                        labelId="from-account-label"
                        // id="from-account"
                        value={accountFrom}
                        label="From Account..."
                        onChange={handleChangeSelect1}
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {accountData && accountData.map((account, i) => {
                                return (
                                    <MenuItem key={i} value={account.accountNumber}>{account.accountNumber}</MenuItem>    
                                );
                            })}
                        </Select>
                    <FormHelperText>Select the account to transfer funds from</FormHelperText>
                </FormControl>
                {(!secondaryAccounts.length) ? (
                    <p>Please select an account to transfer from...</p>
                ) : (
                    <FormControl sx={{ my: 2, minWidth: '100%' }}>
                        <InputLabel id="to-account-helper-label">To Account...</InputLabel>
                            <Select
                            labelId="to-account-label"
                            id="to-account"
                            value={accountTo}
                            label="To Account..."
                            onChange={handleChangeSelect2}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                {secondaryAccounts.map((account, i) => {
                                    return (
                                        <MenuItem key={i} value={account}>{account}</MenuItem>    
                                    );
                                })}
                            </Select>
                        <FormHelperText>Select the account to transfer funds to</FormHelperText>
                    </FormControl>
                )}
                {accountTo &&
                    <FormControl sx={{ my: 3, minWidth: '100%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount (Required)*</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount-required"
                            value={transactionValues.amount}
                            autoFocus={true}
                            error={amountError}
                            onChange={handleInputChange('amount')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount (Required)*"
                            placeholder="0.00"
                            type="string"
                        />
                        <FormHelperText>{amountHelperMsg}</FormHelperText>
                    </FormControl>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={transferFunds} disabled={amountError || !transactionValues.amount}>Transfer</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TransferModal;