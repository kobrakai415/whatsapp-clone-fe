import React, { useState, useEffect } from 'react';
// import { Button, Col } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"

const ApiUrl = process.env.REACT_APP_API_URL

const Profile = ({ setShowProfile, show }) => {

    const [showDropdown, setshowDropdown] = useState(false);
    const [user, setuser] = useState(null);
    const [pic, setpic] = useState(null);

    const [name, setname] = useState("");
    const [changeName, setchangeName] = useState(false);

    const [status, setstatus] = useState("");
    const [changeStatus, setchangeStatus] = useState(false);



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
                setuser(json)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const updateProfilePic = async () => {
        try {
            if (pic) {

                let formData = new FormData()
                formData.append("avatar", pic)

                const res = await fetch(`${ApiUrl}/users/me/uploadAvatar`, {
                    method: "POST",
                    headers: {

                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    body: formData
                })

                if (res.ok) {
                    setshowDropdown(false)
                }
            }


        } catch (error) {
            console.log(error)
        }
    }
    const updateName = async () => {
        try {
            const res = await fetch(`${ApiUrl}/users/me/setUsername`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    username: name
                })
            })
            console.log(res)
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setchangeName(false)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const updateStatus = async () => {
        try {
            const res = await fetch(`${ApiUrl}/users/me/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    status: status
                })
            })
            console.log(res)
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setchangeStatus(false)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserData()

    }, [showDropdown, changeName, changeStatus])

    return (

        <div className={`h-100 stone-background`}>
            <div className="d-flex pt-5 pb-4 px-4 green-background">
                <svg onClick={() => setShowProfile(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path></svg>
                <strong className="ps-4">Profile</strong>
            </div>


            <div onClick={() => setshowDropdown(true)} style={{ position: "relative" }} className="scale-in-center profile-pic d-flex justify-content-center align-items-center py-5">

                <img height={200} width={200} style={{ borderRadius: "50%" }} src={user ? user.avatar : "https://picsum.photos/seed/picsum/200/300"} alt="profile-pic" />
                <div className="d-flex flex-column justify-content-center align-items-center overlay profile-pic" >


                    <img height={50} width={50} style={{ borderRadius: "50%" }} src="https://icon-library.com/images/edit-profile-icon/edit-profile-icon-18.jpg" alt="WA"/>
                    <span className="d-flex text-white">CHANGE <br /> PROFILE PIC</span>
                </div>
            </div>
            {showDropdown &&
                <div className="d-flex pb-4 px-4">
                    <input onChange={(e) => setpic(e.target.files[0])} type="file" /> <FaCheck style={{ fontSize: "30px" }} className="me-3" onClick={updateProfilePic} ></FaCheck> <GiCancel style={{ fontSize: "30px" }} onClick={() => setshowDropdown(false)}></GiCancel>
                </div>}



            <div className="shadow-sm py-3 px-4 white-background">
                <h6>Your Name</h6>
                <div className="pt-3 d-flex justify-content-between">
                    {!changeName && user && <>
                        <h5>{user.username}</h5> <svg onClick={() => setchangeName(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"></path></svg>
                    </>}
                    {changeName && user &&
                     <>
                        <input placeholder={user.username} value={name} onChange={(e) => setname(e.target.value)}></input>
                        <FaCheck  style={{ fontSize: "20px" }}  onClick={updateName} ></FaCheck>
                    </>}
                </div>
            </div>
            <div className="px-4 py-4 ">
                <span className="text-muted">This is not your username or pin. This name will be visible to your WhatsApp contacts.</span>
            </div>
            <div className="shadow-sm py-3 px-4 white-background">
                <h6>About</h6>
                <div className="pt-3 d-flex justify-content-between">
                   {!changeStatus && user &&
                   <>
                    <h5>{user.status}</h5> <svg onClick={() => setchangeStatus(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"></path></svg>
                    </>}
                    {changeStatus && 
                    <>
                    <input placeholder={user.status} value={status} onChange={(e) => setstatus(e.target.value)}></input>
                    <FaCheck style={{ fontSize: "20px" }} onClick={updateStatus} ></FaCheck>
                    </>}
   
                </div>
            </div>

        </div >

    );
}


export default Profile;
