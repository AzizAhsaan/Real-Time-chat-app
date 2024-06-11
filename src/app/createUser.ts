import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { username } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
      },
    });
    res.json(newUser);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}