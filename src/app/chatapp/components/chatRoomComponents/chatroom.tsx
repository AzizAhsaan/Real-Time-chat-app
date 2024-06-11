'use client'
import React, { useEffect,useState } from 'react'
import { CreateChatRoom } from './CreateChatRoom'
import { Copy } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {}

const ChatRoom = (props: Props) => {
  const [chatRooms, setChatRooms] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/ChatRooms', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => setChatRooms(data))
    .catch(error => console.error('Error:', error));
  }, []);
  const userID: string = usePathname().split('/')[3];
  console.log(userID)
  return (
    <div className='w-full flex flex-col items-center p-1  h-full'>
      <div className='h-[50px] items-center flex justify-end w-full'>
        <CreateChatRoom />
      </div>
      <div className='h-[calc(100%-80px)] overflow-y-scroll w-full grid grid-cols-1'>
        {chatRooms && chatRooms?.map((chatRoom:any) => {
          return (
            <div key={chatRoom.id} className='h-[50px] w-full flex flex-row items-center justify-between p-2'>
              <div className='flex flex-row items-center'>
                <Copy size={24} />
                <div className='ml-2'>{chatRoom.name}</div>
              </div>
              <div>
                <Link href={`/chatapp/user/${userID}/chatroom/${chatRoom.id}`} ><button className='bg-blue-500 text-white p-2 rounded-lg'>Join</button></Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatRoom