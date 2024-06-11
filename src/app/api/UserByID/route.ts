import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log('Request received:', req.method, req.url);
    console.log('Query parameters:', req.query);
    const url = new URL(req.url!, `http://${req.headers.host}`);
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