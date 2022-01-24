import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu.js';
import BrowseCatalog from './BrowseCatalog.js';
import BrowseBasket from './BrowseBasket.js';
import PlaceOrder from './PlaceOrder.js';
import BrowseOrderHistory from './BrowseOrderHistory.js';
import PlaceComplaint from './PlaceComplaint.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route exact path="/browseCatalog">
            <BrowseCatalog />
          </Route>
          <Route exact path="/browseBasket">
            <BrowseBasket />
          </Route>
          <Route exact path="/placeOrder">
            <PlaceOrder />
          </Route>
          <Route exact path='/browseOrderHistory'>
            <BrowseOrderHistory />
          </Route>
          <Route exact path='/placeComplaint'>
            <PlaceComplaint />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
