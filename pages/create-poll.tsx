import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { useFormik } from "formik";
import styles from "../styles/Home.module.css";
import pageStyles from "../styles/Polls.module.css";
import FormInput from "../components/FormInput";
import Header from "../components/Header";

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
            <h2>Create Poll</h2>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className={pageStyles["poll-input-div"]}>
                <label htmlFor="caption" className={pageStyles["poll-form-label"]}>
                  Poll Caption
                </label>
                <input
                  className={pageStyles["poll-form-input"]}
                  id="caption"
                  name="caption"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <FormInput option="Option 1" inputType="text" />
              <FormInput option="Option 2" inputType="text" />
              <FormInput option="Option 3" inputType="text" />
              <FormInput option="Option 4" inputType="text" />
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className={pageStyles["create-poll-button"]}
                  style={{
                    padding: "10px",
                    backgroundColor: "#ddd",
                    borderRadius: "10px",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          style={{ padding: "10px", backgroundColor: "#ddd", borderRadius: "10px" }}
        >
          <Link href="/">
            <h2 className={inter.className}>Back</h2>
          </Link>
        </div>
        <div></div>
        <div></div>
      </main>
    </>
  );
}
