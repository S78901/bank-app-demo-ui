import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { convertToUSD, convertToEUR, convertToGBP } from '../utils/currencyConverters';

function Accounts() {
    const initialRender = useRef(true);
    const accountData = useSelector((state) => state.accounts);
    const [loading, setLoading] = useState(true);
    const [val, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log("This is the accountData:")
    // console.log(accountData)

    useEffect(() => {
        if(!initialRender.current) {
            if(accountData[0]?.accountNumber === "") {
                setLoading(true);
            } else {
                setLoading(false);
            }
        } else {
            initialRender.current = false;
        }
    }, [accountData]);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
    
        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                {children}
                </Box>
            )}
            </div>
        );
    }

    return (
        <Fragment>
            <></>
            {loading === true ? (
                <p>Accounts loading...</p>
            ) : (
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={val}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        {accountData.map((account, i) => {
                            return (
                                <Tab key={i} label={<span>Checking Account: {account.accountNumber}</span>} value={i} />     
                            );
                        })}
                    </Tabs>
                    {accountData.map((account, i) => {
                        return (
                            <TabPanel value={val} index={i} key={i} className="wrapPanel">
                                <h2>Account number: {account.accountNumber}</h2>
                                <p>Current Balance: {convertToUSD(account.currentBalance)}</p>
                                <p>Available Balance: {convertToUSD(account.availableBalance)}</p>
                                <h3>Transactions:</h3>
                                <table className="tableStyle">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Action</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {account.transactions.map((transaction, i) => { 
                                            let {timestamp, action, description, amount, currency} = transaction;

                                            let isUSD = currency === "USD";
                                            let isEUR = currency === "EUR";
                                            let isGBP = currency === "GBP";

                                            let convertedAmount;

                                            if (isUSD) {
                                                convertedAmount = convertToUSD(amount);
                                            } else if (isEUR) {
                                                convertedAmount = convertToEUR(amount);
                                            } else if (isGBP) {
                                                convertedAmount = convertToGBP(amount);
                                            }

                                            let isDebit = action === "debit";

                                            let convertedTimeFromISOString = moment(timestamp).format('MM/DD/YYYY h:mm:ss a')
                                            return (
                                                <tr key={i} data-testid="tr-transactions">
                                                    <td>{convertedTimeFromISOString}</td>
                                                    <td>{action}</td>
                                                    <td>{description}</td>
                                                    <td>{(isDebit ? "-" : "+") + convertedAmount}</td>
                                                    <td>{currency}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table> 
                            </TabPanel>
                        );
                
                    })}
                </Box>
            )}
        </Fragment>
    );
}


export default Accounts;