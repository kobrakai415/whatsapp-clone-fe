import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-elements/dist/main.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Loggedin from "./pages/Loggedin";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Loggedin />
    </div>
  );
}

export default App;
