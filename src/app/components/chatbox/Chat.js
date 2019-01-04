

import React from 'react';
import moment from 'moment'



const Chat0 = (props) => {
  const { receiverId, senderId } = props.meta;
  const { chats } = props;
  console.log("CHATS: ",chats);
  const chatList = chats && chats.map(chat => {
    if ((chat.sender === senderId && chat.receiver === receiverId) || (chat.receiver === senderId && chat.sender === receiverId)) {
      return(
        <div className={receiverId === chat.receiver ? "chat chat-sender" : "chat chat-receiver"} key={chat.id}>
          <p className="chat-message">{chat.message}</p>
          <span className="chat-date">{moment(chat.date.toDate()).fromNow()}</span>
        </div>
      )
    }
  })


  return(
    <>
      { chatList }
    </>
  )
}

export default Chat0;
