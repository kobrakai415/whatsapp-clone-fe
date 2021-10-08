import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { ChatList } from "react-chat-elements";

const ApiUrl = process.env.REACT_APP_API_URL;

const Chats = ({
  senderId,
  setChatId,
  setPartnerName,
  setPartnerAvatar,
  setReceiverId,
}) => {
  const [query, setQuery] = useState("");
  const [myChats, setMyChats] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchSource, setSearchSource] = useState([]);

  useEffect(() => {
    fetchMyChats();
  }, [JSON.stringify(myChats)]);

  useEffect(() => {
    if (myChats.length !== 0) {
      buildDataSource();
    }
  }, [JSON.stringify(myChats)]);

  useEffect(() => {
    if (query.length > 2) {
      console.log("search is running ");
      searchUsers();
    }
  }, [query]);

  useEffect(() => {
    if (searchResult.length !== 0) {
      console.log("build is running ");
      buildSearchSource();
    }
  }, [JSON.stringify(searchResult)]);

  const buildSearchSource = () => {
    let source = [];
    searchResult.forEach((elem) => {
      let obj = {
        avatar: elem.avatar,
        title: elem.userName,
        id: elem._id,
      };
      source.push(obj);
    });
    setSearchSource(source);
  };

  const searchUsers = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/user/?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        throw new Error("searching failed!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
      } else {
        throw new Error("fetching my chats failed!");
      }
    } catch (error) {
      alert(error.message);
    }
    buildDataSource();
  };

  const buildDataSource = () => {
    console.log("refreshing chat list");
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

  const isItNewChat = (id, title, avatar) => {
    let found = false;
    myChats.forEach((elem) => {
      elem.members.forEach((member) => {
        if (member._id === id) {
          setChatId(elem._id);
          setPartnerName(title);
          setPartnerAvatar(avatar);
          found = true;
        }
      });
    });
    if (found) {
      console.log("I have prev chat with this user");
      setQuery("");
    } else {
      console.log("user is newwwww");
      setQuery("");
      postNewChat(id, title, avatar);
    }
  };

  const postNewChat = async (receiverId, title, avatar) => {
    try {
      const response = await fetch(`${ApiUrl}/api/chat`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          members: [senderId, receiverId],
        }),
      });
      if (response.ok) {
        const data = await response.json();
        let newMyChats = [...myChats, data];
        setMyChats(newMyChats);
        setChatId(data._id);
        setPartnerName(title);
        setPartnerAvatar(avatar);
      } else {
        throw new Error("creating the new chat failed!");
      }
    } catch (error) {
      alert(error.message);
    }
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
        {query.length !== 0 && (
          <ChatList
            className="chat-list"
            dataSource={searchSource}
            onClick={(e) => isItNewChat(e.id, e.title, e.avatar)}
          />
        )}
        {dataSource.length !== 0 && query.length === 0 && (
          <ChatList
            className="chat-list"
            dataSource={dataSource}
            onClick={(e) => {
              setChatId(e.id);
              setPartnerName(e.title);
              setPartnerAvatar(e.avatar);
            }}
          />
        )}
      </Col>
    </>
  );
};

export default Chats;
