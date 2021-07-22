import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { ChatList } from "react-chat-elements";

const ApiUrl = process.env.REACT_APP_API_URL;

const Chats = ({ senderId, setChatId }) => {
  const [query, setQuery] = useState("");
  const [myChats, setMyChats] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    console.log("first useeffect running");
    fetchMyChats();
  }, []);

  useEffect(() => {
    if (myChats.length !== 0) {
      console.log(myChats);
      console.log("second useeffect running");
      buildDataSource();
    }
  }, [myChats]);

  const fetchMyChats = async () => {
    try {
      console.log("start fetching", ApiUrl);
      let response = await fetch(`${ApiUrl}/api/user/me/chats`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myId: senderId,
        }),
      });
      if (response.ok) {
        let data = await response.json();
        setMyChats(data);
        console.log(myChats);
      } else {
        throw new Error("fetching my chats failed!");
      }
    } catch (error) {
      alert(error.message);
    }
    buildDataSource();
  };

  const buildDataSource = () => {
    let source = [];
    myChats.forEach((elem) => {
      let partner = elem.members.filter((member) => member._id !== senderId);

      let obj = {
        avatar: partner[0].avatar,
        title: partner[0].userName,
        id: elem._id,
      };

      source.push(obj);
    });
    setDataSource(source);
  };

  return (
    <>
      <Col md={4} style={{ height: "100%" }}>
        <div id="search-bar-parent">
          <input
            id="search-bar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or start a new chat"
          />
          <svg
            className="search-bar-glass"
            viewBox="0 0 512 512"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
              fill="currentcolor"
            ></path>
          </svg>
        </div>
        {dataSource.length !== 0 && (
          <ChatList
            className="chat-list"
            dataSource={dataSource}
            onClick={(e) => {
              setChatId(e.id);
            }}
          />
        )}
      </Col>
    </>
  );
};

export default Chats;
