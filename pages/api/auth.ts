import { NextApiRequest, NextApiResponse } from "next";
import { API_SERVER } from "../../const";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case "GET":
      res.json({ working: API_SERVER });

    default:
      res.status(500).json({ working: "not" });
  }
}
