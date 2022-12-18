import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import type { Poll } from "types/base";

export async function getServerSideProps(context: any) {
  const resp = await fetch("http://localhost:3000/api/polls");
  const polls = await resp.json();
  return {
    props: {
      polls,
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function Home({ polls }: { polls: Poll[] }) {
  return (
    <>
      <Head>
        <title>Holonym Polls</title>
        <meta name="description" content="Create Sybil resistant polls with Holonym" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />

        <div>
          <Link href="/create-poll">
            <button>Create a poll</button>
          </Link>
        </div>
        <div className={styles.center}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: "10px" }} className="header-text">
              Popular Polls
            </h2>
            <hr style={{ opacity: "0.3" }} />
          </div>

          <div className={styles.grid}>
            {polls.map((pollData) => (
              <Link
                key={pollData.id}
                href={`/polls/${pollData.id}`}
                className={styles.card}
                rel="noopener noreferrer"
              >
                <h3>{pollData.caption}</h3>
              </Link>
            ))}
          </div>

          <hr style={{ opacity: "0.3" }} />
        </div>
        <div></div>
        <div>{"<footer>"}</div>
      </main>
    </>
  );
}
