import React, { useState, useEffect } from "react";
// import { Col } from "react-bootstrap"
import { MessageList } from "react-chat-elements"
// import { MessageList, Input, SystemMessage, Button } from "react-chat-elements"
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";


const ApiUrl = process.env.REACT_APP_API_URL
const socket = io(ApiUrl, { transports: ["websocket"] });

const username = localStorage.getItem("username")

const ChatPannel = ({ chats, chatHis, selectedRoom }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);


    const sendMessage = () => {

        const messageToSend = {
            sender: username,
            text: currentMessage,
            type: "text",
            timestamp: Date.now(),
            // position: 'right',
            // id: "60f8310325ad75631051647f",
        };
        console.log('selectedRoom:', selectedRoom)

        socket.emit("sendMessage", { message: messageToSend, roomId: selectedRoom._id });

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
    }, [chatHis, chatHistory]);


    return (
        <>


            <MessageList
                className='message-list messages d-flex flex-column-reverse'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatHistory ? chatHistory : []} />

            {/* <SystemMessage text={"The start of your legendary conversation with Max"}>

                </SystemMessage> */}



            <div className="input-parent d-flex p-3">
                <InputEmoji
                    className="message-input"
                    value={currentMessage}
                    onChange={(value) => (setCurrentMessage(value))}
                    cleanOnEnter={true}
                    onEnter={sendMessage}
                />


            </div>

        </>
    );
}

export default ChatPannel;
