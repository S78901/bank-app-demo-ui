import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/store/config';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    {/* 
      The Provider is the basis for the React-Redux store. 
      This is where the store is inserted into the application. 
    */}
    <Provider store={configureStore()}>
      {/* 
        This is the Styled Engine Provider for the MUI theme.
      */}
      <StyledEngineProvider injectFirst>
        {/* This is where we embed our App component. */}
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
