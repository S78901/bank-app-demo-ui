# bank-app-demo-ui

Bank App Demo UI is a lightweight front-end SPA (Single Page Application) which allows a user to execute transfer of funds transactions internally between mocked bank accounts, which are initially loaded from a MongoDB Cloud database. 

To access the mock server which fetches from the cloud database, please download the additional project [bank-app-demo-api](https://github.com/S78901/bank-app-demo-api) and get it installed and running. This is step 1. Do this, then come back and follow the Installation section in this project.

Note: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Many of the files are that of the standard Create React App.

## Installation

By now, you should have Node installed (assuming you followed the install process for the other project). However, if you do not have Node or npm, please go [download it here](https://nodejs.org/en/download/) and make sure to install all options including NPM & environmental paths.

Next, clone this project to your machine. Open the bank-app-demo-ui folder in your terminal and run the Node command 'npm install'. This will install all the necessary NPM packages for your server to function.

```bash
npm install
```

Once the packages are done installing, run 'npm start'. 

```bash
npm start
```
Your server will start, and you should see a notification in your terminal of success. The React appliction will run on port 3000 of your localhost. If you visit [http://localhost:3000/](http://localhost:3000/), you should now see the application loading. Once the information loads to the application, such as the account data, this will tell you that the mock server is also running and has been fetched successfully by Axios.

## Testing

In the project directory, you can run:

```bash
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## License
[MIT](https://choosealicense.com/licenses/mit/)