// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import io from 'socket.io-client';

// Establish WebSocket connection
const socket = io('http://localhost:3001'); // Replace with your server URL

type Props = {
  roomsMessages: any;
  roomID: any;
  userID: any;
};

const Messages = (props: Props) => {
  const [message, setMessage] = useState('');
  const [userInfo,setUserInfo] = useState({username:"",id:0,roomMembers:[],messages:[]})
  const [messages, setMessages] = useState<string[]>(props.roomsMessages.messages);
  useEffect(() => {
    setMessages(props.roomsMessages.messages);
},[props.roomsMessages])

useEffect(() => {
    fetch(`/api/Users?id=${props.userID}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => setUserInfo(data))
    .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const handler = (message:any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat message', handler);

    return () => {
      socket.off('chat message', handler);
    };
}, []);
console.log("userInfo",userInfo)
console.log(messages)
  const handleSendMessage = () => {
    socket.emit('chat message', { content: message,userName:userInfo.username, userId: parseInt(props.userID), roomId: parseInt(props.roomID) });
    setMessage('');
  };

  return (
    <div className='w-full h-full overflow-scroll p-1'>
      {messages?.map((message:any, index: number) => (
        <div key={index} className='h-[50px] my-1 w-full mb-1 p-1 bg-gray-500  rounded-lg flex items-center gap-2'>
            <span className='text-white bg-gray-700 p-3'>{message.userName}</span>
          <span className='text-white'>{message.content}</span>
        </div>
      ))}  

      <Input name='Message' className='my-3 bg-black text-white placeholder:text-white' value={message} defaultValue={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={() => handleSendMessage()}>Send</Button>
    </div>
  );
};

export default Messages;
