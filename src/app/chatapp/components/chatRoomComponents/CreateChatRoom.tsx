'use client'
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function CreateChatRoom() {
    const [name,setName] = useState('')
    const handelCreateChatRoom = () => {
        fetch('/api/ChatRooms',{
            method:'POST',
            body:JSON.stringify({
                name:name
            })
        })
    }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white">Create Chat Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Create Chat Room</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label  htmlFor="link" className="sr-only">
              Name
            </Label>
            <Input
              id="name"
              className="bg-gray-800 text-white"
              defaultValue={name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={() => handelCreateChatRoom()} type="button" variant="secondary">
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
