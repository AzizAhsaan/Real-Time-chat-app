import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req:Request,res:NextApiResponse) {
    const data = await req.json()
    await prisma.room.create({
        data: {
            name: data.name,
        }
    })
    return NextResponse.json({
        "Message":"Done created room successfully"
    })

     
}
export async function GET(req: NextRequest) {
    try {
        const allRooms = await prisma.room.findMany();
        return NextResponse.json(allRooms, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


