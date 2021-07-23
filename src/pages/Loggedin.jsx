import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-elements/dist/main.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import TopPannel from '../components/TopPannel';
import Chats from "../components/Chats.jsx";
import ChatPannel from "../components/ChatPannel.jsx";
import Profile from "./Profile";
import TopRight from "../components/TopRight";
import TopLeft from "../components/TopLeft";
import { io } from "socket.io-client";

const ApiUrl = process.env.REACT_APP_API_URL;
const socket = io(ApiUrl, { transports: ["websocket"] });


function Home({ routerProps }) {

    const [showProfile, setShowProfile] = useState(false)
    const [user, setuser] = useState(null)

    const [dataSource, setDataSource] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [chats, setChats] = useState(null)

    const [chatHis, setchatHis] = useState(null)

    // const token = localStorage.getItem("accessToken")
    // const username = localStorage.getItem("username")
    
    const id = localStorage.getItem("id")

    const setRoomForUser = async (u) => {
        console.log('u:', u)
        const response = await fetch(`${ApiUrl}/room/user/${u.id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        if (response.ok) {

            const room = await response.json();
            console.log('room:', room)
            if (room._id) {

                console.log('u:', u)
                console.log('id:', id)
                // const test = room.members.filter(item => { if (item._id !== id) return item.username })
                const roomName = room.members.filter(item => (item._id !== id))
                console.log('roomName:', roomName)

                setSelectedRoom(null)
                setSelectedRoom({ ...room, title: roomName[0].username })
                // setSelectedRoom(roomName[0])
                setchatHis(room.chatHistory);
            }
        }
    }

    const setRoom = async (room) => {
        setSelectedRoom(room)
        setchatHis([])
        console.log('room:', room)
        const response = await fetch(`${ApiUrl}/room/history/${room._id}`);
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

        const responseOfChats = await response.json();

        setChats(responseOfChats)

        const chatsNames = responseOfChats.map((item) => {
            return { ...item, title: item.members.map(item => { if (item._id !== id) return item.username }) }
            // return { ...item, onClick: setRoom }
        })
        console.log('chatsNames:', chatsNames)
        setDataSource(chatsNames)
    }

    useEffect(() => {
        fetchUserData()
        getRooms();
        socket.on("connect", () => {
            // socket.emit("joinMyRoom", { username: username, room: username });

            console.log('socket.id:', socket.id)
        });

        console.log('---------------------')
        socket.on("message", (message) => {
            console.log('---------------------')
            setchatHis((chatHis) => [...chatHis, message]);
            console.log('chatHis:', chatHis)
        });




        return () => {
            console.log("Disconnected");
            socket.disconnect();
        };
        // eslint-disable-next-line
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
                localStorage.setItem("id", user._id)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserData();

    }, [showProfile])


    return (
        <div >
            <Container className="py-5 app-container" >
                <Row className="h-100 shadow-lg" >
                    <Col md={4} className="h-100 px-0 d-flex flex-column">

                        {!showProfile && user &&
                            <>
                                <TopLeft name={user.username} avatar={user.avatar} setShowProfile={setShowProfile} routerProps={routerProps} />
                                <Chats chats={chats} setRoom={setRoom} setRoomForUser={setRoomForUser} dataSource={dataSource ? dataSource : []} />
                            </>
                        }

                        {showProfile && <Profile show={showProfile} setShowProfile={setShowProfile} />
                        }

                    </Col>
                    <Col md={8} className="px-0 h-100 d-flex flex-column" >

                        <TopRight selectedRoom={selectedRoom} />

                        <ChatPannel chats={chats} chatHis={chatHis} selectedRoom={selectedRoom} />

                    </Col>
                </Row>

            </Container >


            <div className="green-banner">

            </div>

        </div>

    );
}

export default Home;
