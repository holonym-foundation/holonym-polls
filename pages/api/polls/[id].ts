// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Poll } from "../../../types/base";
import testPolls from "../../../data/testPolls";

type Error = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  const { id } = req.query;
  if (typeof id == "string") {
    res.status(200).json(testPolls[parseInt(id)]);
  } else {
    res.status(400).json({ error: "Invalid poll id" });
  }
}
