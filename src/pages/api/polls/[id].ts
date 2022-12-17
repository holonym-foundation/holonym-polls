// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Poll } from "../../../types/base";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { LowSync, JSONFileSync } from "lowdb";

// DB file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../../../data/db.json");
// Configure lowdb to write to JSONFile
const db = new LowSync(new JSONFileSync<{ polls: any[] }>(file));

type Error = {
  error: string;
};

function handleGet(req: NextApiRequest, res: NextApiResponse<Poll | Poll[] | Error>) {
  const { id, includeVoters } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid poll id" });
  }
  db.read();
  const poll = db.data?.polls.find((p) => p.id === id);
  if (!poll) {
    return res.status(400).json({ error: "Invalid poll id" });
  }
  if (includeVoters) {
    return res.status(200).json(poll);
  }
  const pollWithoutVotes = Object.assign({}, poll);
  delete pollWithoutVotes.votes;
  return res.status(200).json(poll);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  }
  return res.status(400).json({ error: "Invalid request method" });
}
