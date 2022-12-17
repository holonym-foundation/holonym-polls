import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { useFormik } from "formik";
import styles from "../styles/Home.module.css";
import pageStyles from "../styles/Polls.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function CreatePoll() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className={styles.description}>
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
        <div></div>
      </div>
    </>
  );
}
