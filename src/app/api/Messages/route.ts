import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req:Request,res:NextApiResponse) {
    const data = await req.json()
    await prisma.message.create({
        data: {
            content: data.content,
            userId:data.userId,
            roomId:data.roomId
        }
    })
    return NextResponse.json({
        "Message":"Done created message successfully"
    })

     
}