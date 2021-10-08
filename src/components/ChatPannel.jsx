import React from "react";
import { Col } from "react-bootstrap";
import { MessageList } from "react-chat-elements";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Form, FormControl, Button } from "react-bootstrap";

const ApiUrl = process.env.REACT_APP_API_URL;
const socket = io("http://localhost:5000", { transports: ["websocket"] });

const ChatPannel = ({ chatId, senderId }) => {
  const [messagHistory, setMessageHistory] = useState(null);
  const [messagData, setMessageData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isNewMessage, setIsNewMessage] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket id : ", socket.id);
    });

    socket.on("new message", (arg) => {
      console.log(" new message with chat id : ", arg);
      fetchMessages(arg);
    });
  }, []);

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
      socket.emit("new chat", chatId);
    }
  }, [chatId, isNewMessage]);

  useEffect(() => {
    if (messagHistory) {
      buildMessageData();
    }
  }, [messagHistory]);

  const fetchMessages = async (id) => {
    try {
      const response = await fetch(`${ApiUrl}/api/chat/${id}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessageHistory(data);
        console.log(messagHistory);
      } else {
        throw new Error("fetching messages failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const buildMessageData = () => {
    let source = [];
    messagHistory.forEach((elem) => {
      let position = elem.sender !== senderId ? "right" : "left";
      let obj = {
        position: position,
        type: "text",
        text: elem.content,
        date: elem.createdAt,
      };
      source.push(obj);
    });
    setMessageData(source);
  };

  const postMessage = async (e) => {
    try {
      const response = await fetch(`${ApiUrl}/api/chat/${chatId}/new-message`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          sender: senderId,
        }),
      });
      if (response.ok) {
        setIsNewMessage(!isNewMessage);
        setNewMessage("");
        socket.emit("send message", chatId);
      } else {
        throw new Error("posting new message failed!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Col
      md={8}
      style={{ maxHeight: "100%" }}
      className=" messages d-flex flex-column justify-content-between p-0"
    >
      <div
        className="messages"
        style={{ maxHeight: "100%", overflowY: "scroll" }}
      >
        {messagData.length !== 0 && (
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={messagData}
          />
        )}
      </div>
      {/* <div className="input-parent d-flex p-3">
        <Input
          className="message-input"
          placeholder="Type a message ..."
          multiline={false}
          maxlength={55000}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          rightButtons={
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
              onClick={(e) => postMessage(e)}
            />
          }
        />
      </div> */}
      <Form className="d-flex">
        <FormControl
          type="text"
          placeholder="Type a message ..."
          className="mr-2"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
        />
        <Button variant="outline-success" onClick={(e) => postMessage(e)}>
          Send
        </Button>
      </Form>
    </Col>
  );
};

export default ChatPannel;
