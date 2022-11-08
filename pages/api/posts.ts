import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { prisma } from "../../lib/prismadb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      res.status(200).send("GET posts");
      break;
    case "POST":
      if (!session) {
        res.status(401).end();
        return;
      }
      // create
      /* prisma.post.create({ */
      /*   data: { */
      /*     userId: ??? */
      /*   } */
      /* }) */
      res.status(200).send("POST post");
      break;
    default:
      res.status(405).end();
  }
}
