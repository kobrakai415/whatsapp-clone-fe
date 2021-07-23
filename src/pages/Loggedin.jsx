import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-elements/dist/main.css";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import TopPannel from "../components/TopPannel";
import GetId from "../components/GetId";
import Chats from "../components/Chats.jsx";
import ChatPannel from "../components/ChatPannel.jsx";

const ApiUrl = process.env.REACT_APP_API_URL;

function Loggedin() {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [chatId, setChatId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerAvatar, setPartnerAvatar] = useState("");

  return (
    <>
      {senderId && (
        <Container
          style={{
            zIndex: "1000",
            position: "relative",
            maxHeight: "100vh",
            boxSizing: "border-box",
          }}
          className=" app-container"
        >
          <TopPannel
            style={{ height: "9vh" }}
            senderId={senderId}
            chatId={chatId}
            partnerName={partnerName}
            partnerAvatar={partnerAvatar}
          ></TopPannel>

          <Row style={{ height: "91vh" }}>
            <Chats
              senderId={senderId}
              setChatId={setChatId}
              setPartnerName={setPartnerName}
              setPartnerAvatar={setPartnerAvatar}
              setReceiverId={setReceiverId}
            />

            <ChatPannel chatId={chatId} senderId={senderId} />
          </Row>
        </Container>
      )}
      {!senderId && <GetId setSenderId={setSenderId} />}
    </>
  );
}

export default Loggedin;
