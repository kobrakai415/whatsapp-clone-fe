import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-chat-elements/dist/main.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap"
import TopPannel from '../components/TopPannel';
import Chats from "../components/Chats.jsx"
import ChatPannel from "../components/ChatPannel.jsx"
import Profile from './Profile';
import TopRight from '../components/TopRight';
import TopLeft from '../components/TopLeft';
import { io } from "socket.io-client";
import { useTransition, animated } from "react-spring"


const ApiUrl = process.env.REACT_APP_API_URL
const socket = io(ApiUrl, { transports: ["websocket"] });


function Home() {

    const [showProfile, setShowProfile] = useState(false)
    const [user, setuser] = useState(null)

    const [dataSource, setDataSource] = useState("")
    const [selectedRoom, setSelectedRoom] = useState("")

    const [chatHis, setchatHis] = useState(null)

    const token = localStorage.getItem("accessToken")
    const username = localStorage.getItem("username")

    const transition = useTransition(showProfile, {
        from: { x: -100, y: 0, opacity: 0, },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: -100, opacity: 0 },
        delay: 100
    })

    const setRoomForUser = async (user) => {
        console.log('user:', user)
        const response = await fetch(`${ApiUrl}/room/user/${user}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        const { chatHistory } = await response.json();
        setSelectedRoom(user)
        setchatHis(chatHistory);
        console.log('selectedRoom:', selectedRoom)

    }

    const setRoom = async (room) => {
        setSelectedRoom(room)
        setchatHis([])
        // socket.emit("chatHistoryOfSelectedRoom", (selectedRoom))
        const response = await fetch(`${ApiUrl}/room/history/${room}`);
        const { chatHistory } = await response.json();
        setchatHis(chatHistory);
    }

    const getRooms = async () => {
        const response = await fetch(`${ApiUrl}/users/me/chats`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        const chats = await response.json();
        console.log('chats:', chats)
        const data = chats.map((item) => {
            return { ...item, onClick: setRoom }
        })
        console.log('data:', data)
        setDataSource(data)
    }

    useEffect(() => {

        getRooms()

        socket.on("connect", () => {
            socket.emit("joinMyRoom", { username: username, room: username });

            console.log(socket.id);

        });
        socket.on("message", (message) => {
            setchatHis((oldChatHistory) => [...oldChatHistory, message]);
          });


        return () => {
            console.log("Disconnected");
            socket.disconnect();
        };
    }, []);


    const fetchUserData = async () => {
        try {
            const res = await fetch(`${ApiUrl}/users/me`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })

            if (res.ok) {
                const json = await res.json()
                // console.log(json)
                setuser(json)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [showProfile])


    return (
        <div >
            <Container className="py-5 app-container" >
                <Row className="h-100 shadow-lg" >
                    <Col md={4} className="h-100 px-0 d-flex flex-column">

                        {!showProfile && user &&
                            <>
                                <TopLeft name={user.username} avatar={user.avatar} setShowProfile={setShowProfile} />

                                <Chats setRoom={setRoom} setRoomForUser={setRoomForUser} dataSource={dataSource ? dataSource : []} />
                            </>
                        }

                        {/* {showProfile && <Profile show={showProfile} setShowProfile={setShowProfile} />
                        } */}
                        {transition((style, item) =>
                            item ? <animated.div className={`h-100 stone-background`} style={style} ><Profile show={showProfile} setShowProfile={setShowProfile}/> </animated.div> : null
                        )}

                    </Col>
                    <Col md={8} className="px-0 h-100 d-flex flex-column" >

                        <TopRight selectedRoom={selectedRoom} />

                        <ChatPannel chatHis={chatHis} selectedRoom={selectedRoom} />

                    </Col>
                </Row>

            </Container >


            <div className="green-banner">

            </div>

        </div>

    );
}

export default Home;
