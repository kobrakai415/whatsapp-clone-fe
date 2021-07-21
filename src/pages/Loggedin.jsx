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

const ApiUrl = process.env.REACT_APP_API_URL
const socket = io(ApiUrl, { transports: ["websocket"] });


function Home() {

    const [showProfile, setShowProfile] = useState(false)
    const [user, setuser] = useState(null)

    const [dataSource, setDataSource] = useState("")
    const [selectedRoom, setSelectedRoom] = useState("")

    const [chatRoom, setChatRoom] = useState("")
    const [chatHis, setchatHis] = useState(null)

    const token = localStorage.getItem("accessToken")
    const username = localStorage.getItem("username")

    // const startChat = () => {
    // socket.emit("startChat", {userId: } )
    //

    const setRoom = (room) => {
        console.log('room:', room)
        setSelectedRoom(room)
        socket.emit("chatHistoryOfSelectedRoom", (selectedRoom))

    }

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.on("roomData", (roomData) => {
            console.log('roomData:', roomData)
            const data = roomData.map((item) => {
                return { ...item, onClick: setRoom }
            })

            setDataSource(data)

        })

        socket.emit("chatHistoryOfSelectedRoom", (selectedRoom))

        socket.on("chatHistory", ({ chatHistory, room }) => {
            setchatHis(chatHistory)
            setChatRoom(chatHistory)
        })

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
    }, [])


    return (
        <div >
            <Container className="py-5 app-container" >
                <Row className="h-100 shadow-lg" >
                    <Col md={4} className="h-100 px-0 d-flex flex-column">

                        {!showProfile && user &&
                            <>
                                <TopLeft avatar={user.avatar} setShowProfile={setShowProfile} />

                                <Chats setRoom={setRoom} dataSource={dataSource} />
                            </>
                        }

                        {showProfile && <Profile show={showProfile} setShowProfile={setShowProfile} />
                        }

                    </Col>
                    <Col md={8} className="px-0 h-100 d-flex flex-column" >

                        <TopRight />

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
