import React, { useState, useEffect } from 'react';
// import { Col } from "react-bootstrap"
import { ChatList } from "react-chat-elements"

const ApiUrl = process.env.REACT_APP_API_URL

const Chats = ({ dataSource, setRoom, setRoomForUser }) => {
    const [query, setQuery] = useState("")
    const [contacts, setcontacts] = useState(null);

    const fetchQuery = async () => {
        try {
            if (query !== '') {
                const res = await fetch(`${ApiUrl}/users/search/${query}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                if (res.ok) {
                    const json = await res.json()
                    const users = json.map(item => { return { avatar: item.avatar, title: item.username, date: false, id: item._id } })
                    setcontacts(users)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchQuery()
        // eslint-disable-next-line
    }, [query])

    return (
        <>
            <div className="search-background p-2">

                <div id="search-bar-parent">
                    <input id="search-bar" value={query} onChange={(e) => { setQuery(e.target.value) }} placeholder="Search or start a new chat" />
                    <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                    </svg>
                </div>
            </div>

            {
                query.length === 0 &&

                <ChatList
                    style={{ maxHeight: "100%", overflowY: "scroll", }}
                    className='chat-list '
                    dataSource={dataSource}
                    onClick={(e) => setRoom(e)}
                />
            }

            {
                query.length > 0 && contacts &&
                <>
                    <h6 className="py-2 ps-3">Contacts</h6>
                    <ChatList
                        className='chat-list'
                        dataSource={contacts}
                        onClick={(e) => {
                            setRoomForUser(e);
                            setQuery("");
                        }
                        }

                    />
                </>
            }
        </>

    );
}

export default Chats;
