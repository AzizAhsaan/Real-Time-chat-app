import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req:Request,res:NextApiResponse) {
    const data = await req.json()
    console.log(data,"data")
    await prisma.user.create({
        data: {
            username: data.username,
        }
    })
    return NextResponse.json({
        "Message":"Done created successfully"
    })
}

export async function GET(req: NextRequest, res: NextApiResponse) {
    const host = req.headers.get('host');
    const url = new URL(req.url!, `http://${host}`);
        const id = url.searchParams.get('id');

        const room = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include:{
                messages:true,
                roomMembers:true,
            }
        });
        return NextResponse.json(room, { status: 200 });
}
