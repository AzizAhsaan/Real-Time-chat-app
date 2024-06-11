'use client'
import React, { useEffect, useState } from 'react'
import ChatRoom from '@/app/chatapp/components/chatRoomComponents/chatroom'
import { usePathname } from 'next/navigation';
import Messages from '@/app/chatapp/components/chatRoomComponents/Messages';
type Props = {}

const ChatRoomByID = (props: Props) => {
  const [roomsMessages, setRoomsMessages] = useState([]);
  const userID: string = usePathname().split('/')[3];
  const roomID: string = usePathname().split('/')[5];
  useEffect(() => {
    fetch(`/api/UserByID?id=${roomID}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => setRoomsMessages(data))
    .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div className='bg-black h-screen justify-center flex items-center w-full'>
        <div className='w-full h-[600px] gap-2 p-2 flex flex-row justify-center items-center'>
            <div className='h-full w-[400px] bg-white rounded-lg'>
                <ChatRoom />
            </div>
            <div className='h-full w-[calc(100%-400px)] bg-white rounded-lg '>
              <Messages userID={userID} roomID={roomID} roomsMessages={roomsMessages} />
            </div>
        </div>
    </div>
  )
}

export default ChatRoomByID