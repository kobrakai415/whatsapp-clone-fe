import React from "react"
// import { Col } from "react-bootstrap"

const TopRight = ({ selectedRoom }) => {
    return (


        <div className="stone-background d-flex justify-content-between">

            <div className="d-flex align-items-center justify-content-center">
                {/* <div className="d-flex" style={{ paddingLeft: "13px", paddingRight: "15px" }}>
                    <img
                        className="my-3"
                        height={45} width={45}
                        style={{ borderRadius: "50%" }}
                        src="https://cdn.vox-cdn.com/thumbor/mXo5ObKpTbHYi9YslBy6YhfedT4=/95x601:1280x1460/1200x800/filters:focal(538x858:742x1062)/cdn.vox-cdn.com/uploads/chorus_image/image/66699060/mgidarccontentnick.comc008fa9d_d.0.png"
                        alt="user-profile-pic"
                    />
                </div> */}
                <span className="p-2">{selectedRoom ? selectedRoom.title : ""}</span>
            </div>
            <div className="d-flex align-items-center">
                <svg
                    className="m-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24" height="24">
                    <path
                        fill="currentColor"
                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                    </path>
                </svg>

                <svg
                    className="m-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24" height="24">
                    <path
                        fill="currentColor"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                    </path>
                </svg>
            </div>

        </div>


    );
}

export default TopRight;
