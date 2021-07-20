import React from "react";
import { Col } from "react-bootstrap";
import { MessageList, Input, SystemMessage, Button } from "react-chat-elements";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io(`http://localhost:5000`, {
  transports: ["websocket"],
});

const ChatPannel = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("hello", (arg1, arg2) => {
      console.log(arg1, arg2);
      socket.emit(arg1, "khodeti");
    });
  }, []);

  return (
    <Col md={8} className="d-flex flex-column justify-content-between p-0">
      <div clasName="messages" style={{ overflowY: "scroll" }}>
        <SystemMessage
          text={"The start of your legendary conversation with Max"}
        ></SystemMessage>

        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
          ]}
        />
      </div>
      <div className="input-parent d-flex p-3">
        <Input
          className="message-input"
          placeholder="Type a message ..."
          multiline={false}
          maxlength={55000}
          rightButtons={
            <Button color="white" backgroundColor="black" text="Send" />
          }
        />
      </div>
    </Col>
  );
};

export default ChatPannel;
