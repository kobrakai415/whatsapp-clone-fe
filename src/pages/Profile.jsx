import React, { useState, useEffect } from 'react';
import { Col } from "react-bootstrap"

const ApiUrl = process.env.REACT_APP_API_URL

const Profile = ({ setShowProfile, show }) => {

    const [slideOut, setslideOut] = useState(false);
    const [showDropdown, setshowDropdown] = useState(false);

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

        return () => {
            setslideOut(true)
        }
    })

    return (

        <div className={`h-100 stone-background  ${show ? `slide-in-left` : "slide-out-left"}`}>
            <div className="d-flex pt-5 pb-4 px-4 green-background">
                <svg onClick={() => setShowProfile(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path></svg>
                <strong className="ps-4">Profile</strong>
            </div>


            <div style={{ position: "relative" }} className="profile-pic d-flex justify-content-center align-items-center py-5">

                <img onClick={() => setshowDropdown(true)} height={200} width={200} style={{ borderRadius: "50%" }} src="https://picsum.photos/seed/picsum/200/300" alt="profile-pic" />
                <div className="d-flex flex-column justify-content-center align-items-center overlay profile-pic" >

                   
                    <img height={50} width={50} style={{ borderRadius: "50%" }} src="https://icon-library.com/images/edit-profile-icon/edit-profile-icon-18.jpg" />
                    <span className="d-flex text-white">CHANGE <br /> PROFILE PIC</span>
                    <input type="file"/> 
                </div>
            </div>



            <div className="shadow-sm py-3 px-4 white-background">
                <h6>Your Name</h6>
                <div className="pt-3 d-flex justify-content-between">
                    <h5>Kai</h5> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"></path></svg>
                </div>
            </div>
            <div className="px-4 py-4 ">
                <span className="text-muted">This is not your username or pin. This name will be visible to your WhatsApp contacts.</span>
            </div>
            <div className="shadow-sm py-3 px-4 white-background">
                <h6>About</h6>
                <div className="pt-3 d-flex justify-content-between">
                    <h5>Busy</h5> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"></path></svg>
                </div>
            </div>

        </div >

    );
}


export default Profile;
