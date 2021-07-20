import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-chat-elements/dist/main.css';
import { useEffect } from 'react';
import { Container, Row } from "react-bootstrap"
import TopPannel from '../components/TopPannel';
import Chats from "../components/Chats.jsx"
import ChatPage from "../components/ChatPannel.jsx"

const ApiUrl = process.env.REACT_APP_API_URL

function Home() {

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
                console.log(json)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])


    return (

        <Container style={{ zIndex: "1000", position: "relative", maxHeight: "100vh", boxSizing: "border-box" }} className=" app-container" >
            < TopPannel style={{ height: "9vh" }}>

            </TopPannel >

            <Row style={{ height: "91vh" }}>
                <Chats />

                <ChatPage />

            </Row>


        </Container >

    );
}

export default Home;

{/* <div style={{ top: "0px", position: "absolute" }} className="green-banner">
        hello
      </div> */}