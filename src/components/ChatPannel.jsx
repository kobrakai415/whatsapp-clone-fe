import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap"
import { MessageList, Input, SystemMessage, Button } from "react-chat-elements"
import { io } from "socket.io-client";

const ApiUrl = process.env.REACT_APP_API_URL
const socket = io(ApiUrl, { transports: ["websocket"] });

let username = 'mohammad'
username = username ? localStorage.getItem("username") : 'mohammad'

const ChatPannel = ({ chatHis, selectedRoom }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    console.log('chatHis:', chatHis)
    console.log('selectedRoom:', selectedRoom)

    const sendMessage = (e) => {
        e.preventDefault();
        const messageToSend = {
            sender: username,
            text: currentMessage,
            type: "text",
            timestamp: Date.now(),
            // position: 'right',
            // id: "60f8310325ad75631051647f",
        };
        socket.emit("sendMessage", { message: messageToSend, room: selectedRoom });

        messageToSend.position = 'right'
        setChatHistory([...chatHistory, messageToSend]);
        setCurrentMessage("");
    };

    useEffect(() => {
        setChatHistory([])
        console.log('username:', username)
        console.log('chatHis:', chatHis)
        if (chatHis) {
            for (let index = 0; index < chatHis.length; index++) {
                if (chatHis[index].sender === username) {
                    chatHis[index].position = 'right';
                } else {
                    chatHis[index].position = 'left';
                }
            }
        }
        setChatHistory(chatHis)
    }, [chatHis]);


    return (
        <>
            <div className="messages d-flex flex-column-reverse">

                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={chatHistory ? chatHistory : []} />

                {/* <SystemMessage text={"The start of your legendary conversation with Max"}>

                </SystemMessage> */}
            </div>

            <div className="input-parent d-flex p-3">

                <Input
                    className="message-input"
                    placeholder="Type a message ..."
                    multiline={false}
                    maxlength={55000}
                    value={currentMessage}
                    onChange={(e) => (setCurrentMessage(e.target.value))}
                    rightButtons={<Button

                        color='white'
                        backgroundColor='black'
                        text='Send'
                        onClick={sendMessage}
                    />
                    }
                />


            </div>
        </>
    );
}

export default ChatPannel;
