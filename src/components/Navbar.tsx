import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import HolonymLogo from "img/Holonym-Logo-W.png";
import styles from "../styles/Home.module.css";
import SiweButton from "./SiweButton";

export default function Navbar() {
  return (
    <>
      <div id="navbar" className="navbar">
        <div>
          <h1 className="header-text">Sybil-Resistant Polls</h1>
          <a
            href="https://holonym.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "Clover Regular" }}
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
