import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-elements/dist/main.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoggedIn from "./pages/Loggedin"

function App() {
  return (

    <Router>
      <Route path="/" exact render={(routerProps) => <Home routerProps={routerProps} />} />
      <Route path="/user" exact render={(routerProps) => <LoggedIn routerProps={routerProps} />} />

    </Router>

  );
}

export default App;
