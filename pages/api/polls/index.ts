// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Poll } from "../../../types/base";
import testPolls from "../../../data/testPolls";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { LowSync, JSONFileSync } from "lowdb";

type Error = {
  error: string;
};

// DB file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../../../data/db.json");
// Configure lowdb to write to JSONFile
const db = new LowSync(new JSONFileSync<{ polls: any[] }>(file));

async function createPoll(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  // Read db to get poll data
  await db.read();
  if (!db.data?.polls) {
    return res.status(500).json({ error: "Database is unexpectedly empty" });
  }

  const { caption, opt1, opt2, opt3, opt4 } = req.body;
  if (caption && opt1 && opt2 && opt3 && opt4) {
    // TODO: Validate poll data (e.g., value lengths)

    const newPoll: Poll = {
      id: db.data.polls.length,
      caption,
      opt1,
      opt2,
      opt3,
      opt4,
      opt1Votes: 0,
      opt2Votes: 0,
      opt3Votes: 0,
      opt4Votes: 0,
    };
    db.data.polls.push(newPoll);
    await db.write();
    res.status(200).json(newPoll);
  } else {
    res.status(400).json({ error: "Invalid poll data" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  if (req.method === "GET") {
    db.read();
    res.status(200).json(db.data?.polls ?? []);
  } else if (req.method === "POST") {
    await createPoll(req, res);
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
