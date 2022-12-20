import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import type { Poll } from "../../types/base";
import { LowSync, JSONFileSync } from "lowdb";

type Error = {
  error: string;
};

type VoteBody = {
  id: string;
  option: "1" | "2" | "3" | "4";
  address: string;
  signature: string;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../../data/db.json");
const db = new LowSync(new JSONFileSync<{ polls: any[] }>(file));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Invalid request method" });
  }
  const { id, option, address, signature }: VoteBody = req.body;
  if (id && option && address && signature) {
    const signer = ethers.utils.verifyMessage(id, signature);
    if (signer !== address) {
      console.log("Invalid signature", signer, address);
      return res.status(400).json({ error: "Invalid signature" });
    }
    const resp = await axios.get(
      `https://api.holonym.io/sybil-resistance/gov-id/optimism?user=${address}&action-id=123456789`
    );
    const sybilResult = resp.data;
    if (!sybilResult?.result) {
      return res.status(400).json({ error: "User has not proven uniqueness" });
    }

    await db.read();
    if (!db.data?.polls) {
      return res.status(500).json({ error: "Database is unexpectedly empty" });
    }

    const poll = db.data.polls.find((p) => p.id === id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    if (poll.voters[address]) {
      return res
        .status(400)
        .json({ error: "This address has already voted in this poll" });
    }

    // NOTE: While using a file for a database, this will result in race conditions.
    //       In a production environment, a database should be used instead.
    // TODO: We might need to sanitize option once we start using a real database
    poll[`opt${option}Total`] += 1;
    poll.voters[address] = option;
    await db.write();

    res.status(200).json(poll);
  } else {
    res.status(400).json({ error: "Invalid poll data" });
  }
}
