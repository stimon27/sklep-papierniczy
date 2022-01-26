import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from '../menu/Menu.js';
import BrowseCatalog from '../browseCatalog/BrowseCatalog.js';
import BrowseBasket from '../browseBasket/BrowseBasket.js';
import PlaceOrder from '../placeOrder/PlaceOrder.js';
import BrowseOrderHistory from '../browseOrderHistory/BrowseOrderHistory.js';
import PlaceComplaint from '../placeComplaint/PlaceComplaint.js';

const CUSTOMER_ID = 10;

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route exact path="/browseCatalog">
            <BrowseCatalog customerId={CUSTOMER_ID}/>
          </Route>
          <Route exact path="/browseBasket">
            <BrowseBasket customerId={CUSTOMER_ID}/>
          </Route>
          <Route exact path="/placeOrder">
            <PlaceOrder customerId={CUSTOMER_ID}/>
          </Route>
          <Route exact path='/browseOrderHistory'>
            <BrowseOrderHistory customerId={CUSTOMER_ID}/>
          </Route>
          <Route exact path='/placeComplaint'>
            <PlaceComplaint customerId={CUSTOMER_ID}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
