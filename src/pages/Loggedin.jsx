import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-chat-elements/dist/main.css';
import { Container, Row } from "react-bootstrap"
import TopPannel from '../components/TopPannel';
import Chats from "../components/Chats.jsx"
import ChatPage from "../components/ChatPannel.jsx"

function Home() {
    return (


        <Container style={{ zIndex: "1000", position: "relative", height: "100vh" }} className="my-3 app-container">
            <TopPannel>

            </TopPannel>
            <Row className="h-100">
                <Chats />

                <ChatPage />

            </Row>


            {/* <div style={{ top: "0px", position: "absolute" }} className="green-banner">
        hello
      </div> */}
        </Container>

    );
}

export default Home;