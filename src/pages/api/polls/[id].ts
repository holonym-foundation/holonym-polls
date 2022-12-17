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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (typeof id == "string") {
      db.read();
      res.status(200).json(db.data?.polls[parseInt(id)]);
    } else {
      res.status(400).json({ error: "Invalid poll id" });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
