import './App.css';
import NavBar from './components/NavBar';
import { history } from "./helpers/history";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import AddAdvertise from './components/AddAdvertise';
import Home from './components/Home';


function App() {
  return (
    <div>
      <Router history={history}>
      <NavBar />
      <Switch>
          
          <Route path="/AddAdvertise" component={AddAdvertise} />
          <Route path="/" component={Home} />
        </Switch>
      
      </Router>
    </div>
  );
}

export default App;
