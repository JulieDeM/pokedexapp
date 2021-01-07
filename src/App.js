// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
import './App.css';
import Home from './components/Home/Home';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import { createBrowserHistory } from "history";

import {
  BrowserRouter as Router,
  // BrowserHistory,
  Switch,
  Route,
} from "react-router-dom";

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/pokemon/:num' component={PokemonDetails} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
