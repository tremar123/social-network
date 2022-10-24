import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  switch (req.method) {
    case "GET":
      res.status(200).send("GET posts");
      break;
    case "POST":
      res.status(200).send("POST post");
      break;
    default:
      res.status(405).end();
  }
}
