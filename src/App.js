import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-chat-elements/dist/main.css';
import { Container, Row } from "react-bootstrap"
import TopPannel from './components/TopPannel';
import Chats from "./components/Chats.jsx"
import ChatPage from "./components/ChatPage.jsx"

function App() {
  return (
    <>
      <div className="green-banner">

      </div>
      <Container className="my-3 app-container">
        <TopPannel>

        </TopPannel>
        <Row>
          <Chats />

          <ChatPage />

        </Row>
      </Container>
    </>
  );
}

export default App;
