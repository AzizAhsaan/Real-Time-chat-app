import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextApiResponse) {
    const host = req.headers.get('host');
    const url = new URL(req.url!, `http://${host}`);
        const id = url.searchParams.get('id');
    if (!id) {
      throw new Error('ID is undefined');
    }

    const room = await prisma.room.findUnique({
        where: {
            id: Number(id),
        },
        include:{
            messages:true,
            
        }
    });
    return NextResponse.json(room, { status: 200 });
}