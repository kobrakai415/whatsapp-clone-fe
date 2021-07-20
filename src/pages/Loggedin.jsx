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

const ApiUrl = process.env.REACT_APP_API_URL

function Home() {

    const [showProfile, setShowProfile] = useState(false)

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
        <div >
            <Container className="py-5 app-container" >
                <Row className="h-100 shadow-lg" >
                    <Col md={4} className="h-100 px-0 d-flex flex-column">

                        {!showProfile &&
                            <>
                                <TopLeft setShowProfile={setShowProfile} />

                                <Chats />
                            </>
                        }

                        {showProfile && <Profile show={showProfile} setShowProfile={setShowProfile} />
                        }

                    </Col>
                    <Col md={8} className="px-0 h-100 d-flex flex-column" >

                        <TopRight />

                        <ChatPannel />

                    </Col>
                </Row>


            </Container >


            <div className="green-banner">

            </div>

        </div>

    );
}

export default Home;
