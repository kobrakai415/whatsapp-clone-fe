import React from 'react';
import { Col } from "react-bootstrap"
import { MessageList, Input, SystemMessage, Button } from "react-chat-elements"

const ChatPannel = ({ chatHis }) => {
    console.log('chatHis:', chatHis)
    return (
        <>

            <div className="messages d-flex flex-column-reverse">

                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={chatHis ? chatHis : [{ position: 'left', type: 'text', text: ' ', date: new Date(), }]} />

                {/* <SystemMessage text={"The start of your legendary conversation with Max"}>

                </SystemMessage> */}
            </div>


            <div className="input-parent d-flex p-3">

                <Input
                    className="message-input"
                    placeholder="Type a message ..."
                    multiline={false}
                    maxlength={55000}
                    rightButtons={<Button

                        color='white'
                        backgroundColor='black'
                        text='Send' />

                    }
                />


            </div>
        </>
    );
}

export default ChatPannel;
