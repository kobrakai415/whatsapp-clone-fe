import React from 'react';
import { Col } from "react-bootstrap"
import { MessageList, Input, SystemMessage, Button } from "react-chat-elements"

const ChatPannel = () => {
    return (
        <Col md={8} className="h-100 d-flex flex-column justify-content-between p-0">


            <div clasName="messages" style={{ overflowY: "scroll" }}>
                <SystemMessage text={"The start of your legendary conversation with Max"}>

                </SystemMessage>

                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={[
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                            
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },

                    ]} />
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
        </Col>
    );
}

export default ChatPannel;
