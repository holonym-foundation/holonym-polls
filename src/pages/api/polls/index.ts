// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { LowSync, JSONFileSync } from "lowdb";
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import sanitizeHtml from "sanitize-html";
import type { Poll } from "../../../types/base";
import { provider } from "api-shared/init";
import { MAX_CAPTION_LENGTH, MAX_OPTION_STR_LENGTH } from "constants/misc";

type Error = {
  error: string;
};

// DB file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../../../data/db.json");
// Configure lowdb to write to JSONFile
const db = new LowSync(new JSONFileSync<{ polls: any[] }>(file));

async function validateTx(txHash: string, polls: Poll[]) {
  try {
    const pollWithSameTxHash = polls.find((p) => p.txHash === txHash.toLowerCase());
    if (pollWithSameTxHash) {
      return { error: "Invalid transaction. Transaction has already been used." };
    }
    const tx = await provider.getTransaction(txHash);
    const requiredValue =
      process.env.NODE_ENV === "development"
        ? ethers.constants.WeiPerEther.div(10000000)
        : ethers.constants.WeiPerEther;
    if (tx?.to?.toLowerCase() !== process.env.THIS_ADDRESS) {
      return { error: `Invalid transaction. tx.to !== ${process.env.THIS_ADDRESS}` };
    }
    if (!tx?.value || tx.value.lt(requiredValue)) {
      return { error: `Invalid transaction. tx.value < ${requiredValue}` };
    }
    if (!tx?.confirmations) {
      return { error: "Invalid transaction. Insufficient number of confirmations" };
    }
  } catch (err) {
    console.log(err);
    return { error: "An error occurred while validating the transaction" };
  }
}

async function createPoll(
  req: NextApiRequest,
  res: NextApiResponse<Poll | Poll[] | Error>
) {
  // Read db to get poll data
  await db.read();
  if (!db.data?.polls) {
    return res.status(500).json({ error: "Database is unexpectedly empty" });
  }

  const { caption, opt1, opt2, opt3, opt4, txHash } = req.body;
  if (caption && opt1 && opt2 && opt3 && opt4 && txHash) {
    const txValidationResult = await validateTx(txHash, db.data.polls);
    if (txValidationResult?.error) {
      return res.status(400).json({ error: txValidationResult.error });
    }

    const sanitizedCaption = sanitizeHtml(caption);
    const sanitizedOpt1 = sanitizeHtml(opt1);
    const sanitizedOpt2 = sanitizeHtml(opt2);
    const sanitizedOpt3 = sanitizeHtml(opt3);
    const sanitizedOpt4 = sanitizeHtml(opt4);

    if (
      sanitizedCaption.length > MAX_CAPTION_LENGTH ||
      sanitizedOpt1.length > MAX_OPTION_STR_LENGTH ||
      sanitizedOpt2.length > MAX_OPTION_STR_LENGTH ||
      sanitizedOpt3.length > MAX_OPTION_STR_LENGTH ||
      sanitizedOpt4.length > MAX_OPTION_STR_LENGTH
    ) {
      console.log(
        "Invalid poll data. Caption or option string too long. Returning 400."
      );
      return res.status(400).json({ error: "Invalid poll data" });
    }

    const newPoll: Poll = {
      id: uuidv4(),
      caption: sanitizedCaption,
      opt1: sanitizedOpt1,
      opt2: sanitizedOpt2,
      opt3: sanitizedOpt3,
      opt4: sanitizedOpt4,
      opt1Total: 0,
      opt2Total: 0,
      opt3Total: 0,
      opt4Total: 0,
      voters: {},
      txHash: txHash.toLowerCase(),
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
    return await createPoll(req, res);
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
