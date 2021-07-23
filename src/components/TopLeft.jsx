import React from "react";
import { Dropdown } from "react-bootstrap";
// import { Col, Dropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";



const TopLeft = ({ routerProps, setShowProfile, avatar, name }) => {

const logOut = () => {
  console.log("loggedout");
  routerProps.history.push("/");
};


  return (
    <div className="stone-background top-pannel-left d-flex justify-content-between">
      <div className="d-flex align-items-center justify-content-center">
        <div style={{ paddingLeft: "13px", paddingRight: "15px" }}>
          <img
            onClick={() => setShowProfile(true)}
            className="my-3"
            height={45}
            width={45}
            style={{ borderRadius: "50%" }}
            src={
              avatar
                ? avatar
                : "https://cdn.vox-cdn.com/thumbor/mXo5ObKpTbHYi9YslBy6YhfedT4=/95x601:1280x1460/1200x800/filters:focal(538x858:742x1062)/cdn.vox-cdn.com/uploads/chorus_image/image/66699060/mgidarccontentnick.comc008fa9d_d.0.png"
            }
            alt="user-profile-pic"
          />
        </div>
        <span>{name}</span>
      </div>

      <div className="d-flex align-items-center">
        <svg className="m-3" id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 1.756.855 8.098 8.098 0 0 1 7.496-4.553.977.977 0 1 0 .051-1.952zM1.926 13.64a10.052 10.052 0 0 0 7.461 7.925.977.977 0 0 0 .471-1.895 8.097 8.097 0 0 1-6.012-6.386.977.977 0 0 0-1.92.356zm13.729 7.454a10.053 10.053 0 0 0 6.201-8.946.976.976 0 1 0-1.951-.081v.014a8.097 8.097 0 0 1-4.997 7.209.977.977 0 0 0 .727 1.813l.02-.009z"
          ></path>
          <path fill="#009588" d="M19 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path>
        </svg>

        <svg className="m-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
          ></path>
        </svg>

        {/* <svg className="m-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
        </svg> */}
        <Dropdown className=" e-caret-hide">
          <Dropdown.Toggle variant="outline" className=" e-caret-hide">
            <svg className="m-3 threeicons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
            </svg>{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => setShowProfile(true)}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => logOut()}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopLeft;
