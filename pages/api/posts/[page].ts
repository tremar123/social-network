import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { prisma } from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const { page } = req.query;
      const pageNum = page ? +page : 1;
      const posts = await prisma.post.findMany({
        skip: pageNum === 1 ? 0 : pageNum * 30,
        take: 30,
        orderBy: {
          created_at: "desc",
        },
      });
      res.status(200).json({ posts: posts });
      break;
    case "POST":
      if (!session) {
        return res.status(401).end();
      }
      const data = req.body as { content: string; images: string[] };
      prisma.post.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          content: data.content,
          images: data.images,
        },
      });
      res.status(200).end();
      break;
    default:
      res.status(405).end();
  }
}
