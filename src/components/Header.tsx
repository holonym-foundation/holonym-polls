import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import HolonymLogo from "img/Holonym-Logo-W.png";
import styles from "../styles/Home.module.css";
import SiweButton from "./SiweButton";

export default function Header() {
  return (
    <>
      <div id="header" className={styles.description}>
        {/* <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p> */}
        <div>
          <h1 className="header-text">Sybil-Resistant Polls</h1>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By
            <Image src={HolonymLogo} alt="Holonym Logo" width={120} priority />
          </a>
        </div>
        <SiweButton />
      </div>
    </>
  );
}
