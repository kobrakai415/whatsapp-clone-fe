import React, { useState, useEffect } from "react";
import { MessageList } from "react-chat-elements"
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";

const ApiUrl = process.env.REACT_APP_API_URL
const socket = io(ApiUrl, { transports: ["websocket"] });

const username = localStorage.getItem("username")

const ChatPannel = ({ chatHistoryFromServer, selectedRoom }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = () => {
        const messageToSend = {
            sender: username,
            text: currentMessage,
            type: "text",
            timestamp: Date.now(),
        };
        socket.emit("sendMessage", { message: messageToSend, roomId: selectedRoom._id });
        setCurrentMessage("");
    };

    useEffect(() => {
    }, [chatHistoryFromServer]);


    return (
        <>
            <MessageList
                className='message-list messages d-flex flex-column-reverse'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatHistoryFromServer ? chatHistoryFromServer.map(item => {
                    return {
                        position: item.sender === username ? 'right' : 'left',
                        text: item.text,
                        type: item.type,
                        date: new Date(item.timestamp),
                        _id: item._id,
                    }
                }) : []}
            />
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
