import React, { useState, useEffect } from 'react';
import { Col } from "react-bootstrap"
import { ChatList } from "react-chat-elements"
import { io } from "socket.io-client";

const ApiUrl = process.env.REACT_APP_API_URL
const socket = io(ApiUrl, { transports: ["websocket"] });

const Chats = () => {
    const [query, setQuery] = useState("")
    const [roomList, setRoomList] = useState("")

    const token = localStorage.getItem("accessToken")
    useEffect(() => {
        console.log("I'm setting the event listeners!");

        socket.on("connect", () => {
            socket.emit("validation", { token, username: "mas" });
            // with on we're listening for an event
            socket.on("validationFailed", console.log("validation Failed"))
            socket.on("rooms", async ({ rooms }) => {
                console.log('rooms:', rooms)
                setRoomList(rooms)
            })
            console.log(socket.id);
        });

        // socket.on("loggedin", () => {
        //     console.log("Now you're successfully logged in!");
        //     setIsLoggedIn(true);
        //     checkOnlineUsers();
        // });

        // socket.on("newConnection", () => {
        //     console.log("newConnection event, someone got in!");
        //     checkOnlineUsers();
        // });

        // socket.on("message", (message: Message) => {
        //     setChatHistory((oldChatHistory) => [...oldChatHistory, message]);
        // });

        return () => {
            console.log("Disconnected");
            socket.disconnect();
        };
    }, []);

    return (
        <Col md={4} style={{ height: "100%" }}>

            <div id="search-bar-parent">
                <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search or start a new chat" />
                <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                </svg>
            </div>
            <ChatList
                className='chat-list'
                dataSource={[
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                        alt: 'Reactjs',
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },

                ]} />

        </Col>
    );
}

export default Chats;
