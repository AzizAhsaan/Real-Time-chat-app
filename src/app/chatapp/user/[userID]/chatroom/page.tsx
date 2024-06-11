'use client'
import React from 'react'
import ChatRoom from '@/app/chatapp/components/chatRoomComponents/chatroom'
type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-black h-screen justify-center flex items-center w-full'>
        <div className='w-full h-[600px] gap-2 p-2 flex flex-row justify-center items-center'>
            <div className='h-full w-[400px] bg-white rounded-lg'>
                <ChatRoom />
            </div>
            <div className='h-full w-[calc(100%-400px)] bg-white rounded-lg '>

            </div>
        </div>
    </div>
  )
}

export default page