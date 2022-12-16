import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import testPolls from "../data/testPolls";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

        <div className={styles.center}>
          <div style={{ textAlign: "center" }}>
            <h2>Popular Polls</h2>
            <hr style={{ opacity: "0.3" }} />
          </div>

          <div className={styles.grid}>
            {testPolls.map((pollData) => (
              <Link
                key={pollData.id}
                href={`/polls/${pollData.id}`}
                className={styles.card}
                rel="noopener noreferrer"
              >
                <h3 className={inter.className}>{pollData.caption}</h3>
              </Link>
            ))}
          </div>

          <hr style={{ opacity: "0.3" }} />
        </div>
        <div
          style={{ padding: "10px", backgroundColor: "#ddd", borderRadius: "10px" }}
        >
          <Link href="/create-poll">
            <h2 className={inter.className}>Create a Poll</h2>
          </Link>
        </div>
        <div></div>
        <div>{"<footer>"}</div>
      </main>
    </>
  );
}
