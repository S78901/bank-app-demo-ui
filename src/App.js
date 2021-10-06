import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import BasePage from './components/BasePage';
import useGetAccount from './actions/getAccount';

function App() {
  
  // This updates the store from an axios fetch of the database for Account data
  useGetAccount();

  return (
    <Router>
      <div className="root">
        <div className="wrapApplication">
          {/* We are only exporting one route here, which is to BasePage. */}
          <Route path="/">
            <BasePage />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
