import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-elements/dist/main.css';
import './App.css';
import './animations.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import LoggedIn from "./pages/Loggedin"
import Signup from './pages/Signup';




function App() {
  return (

    <Router>
      <Route path="/" exact render={(routerProps) => <Login routerProps={routerProps} />} />
      <Route path="/user" exact render={(routerProps) => <LoggedIn routerProps={routerProps} />} />
      <Route path="/signup" exact render={(routerProps) => <Signup routerProps={routerProps} />} />
    </Router>

  );
}

export default App;
