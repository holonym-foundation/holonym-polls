import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Footer from "components/Footer";
import type { Poll } from "types/base";

export async function getServerSideProps(context: any) {
  const resp = await fetch("http://localhost:3000/api/polls");
  const polls = await resp.json();
  return {
    props: {
      polls,
    },
  };
}

export default function Home({ polls }: { polls: Poll[] }) {
  return (
    <>
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
          {polls?.length > 0
            ? polls.map((pollData) => (
                <Link
                  key={pollData.id}
                  href={`/polls/${pollData.id}`}
                  className={styles.card}
                  rel="noopener noreferrer"
                >
                  <h3>{pollData.caption}</h3>
                </Link>
              ))
            : null}
        </div>

        <hr style={{ opacity: "0.3" }} />
      </div>
      <div></div>
    </>
  );
}
