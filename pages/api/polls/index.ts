// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Poll } from "../../../types/base";
import testPolls from "../../../data/testPolls";

export default function handler(req: NextApiRequest, res: NextApiResponse<Poll[]>) {
  res.status(200).json(testPolls);
}
