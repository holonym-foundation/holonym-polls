import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import SiweButton from "./SiweButton";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <>
      <div id="header" className={styles.description}>
        {/* <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p> */}
        <div>
          <h1>Sybil-Resistant Polls</h1>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Holonym
            {/* <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              /> */}
          </a>
        </div>
        <SiweButton />
      </div>
    </>
  );
}
