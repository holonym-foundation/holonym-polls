import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styles from "../styles/Home.module.css";
import pageStyles from "../styles/Polls.module.css";
import Header from "../components/Header";
import PollOption from "../components/CreatePoll/PollOption";

const inter = Inter({ subsets: ["latin"] });

type CreatePollValues = {
  caption: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
};

const initialValues = {
  caption: "",
  opt1: "",
  opt2: "",
  opt3: "",
  opt4: "",
};

const validationSchema = Yup.object({
  caption: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  opt1: Yup.string().max(25, "Must be 25 characters or less").required("Required"),
  opt2: Yup.string().max(25, "Must be 25 characters or less").required("Required"),
  opt3: Yup.string().max(25, "Must be 25 characters or less").required("Required"),
  opt4: Yup.string().max(25, "Must be 25 characters or less").required("Required"),
});

function PollCaptionInput() {
  const [field, meta] = useField("caption");

  return (
    <>
      <div className={pageStyles["input-div-create-poll"]}>
        <label htmlFor="text" className={pageStyles["label-create-poll"]}>
          Caption
        </label>
        <input
          className={pageStyles["text-input-create-poll"]}
          id="text"
          type="text"
          {...field}
        />
        {meta.touched && meta.error ? (
          <div className={pageStyles.error}>{meta.error}</div>
        ) : null}
      </div>
    </>
  );
}

export default function CreatePoll() {
  async function onSubmit(
    values: CreatePollValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) {
    const resp = await fetch("http://localhost:3000/api/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await resp.json();

    alert(JSON.stringify(data, null, 2));
    setSubmitting(false);
  }

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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <PollOption fieldName="caption" displayName="Caption" />
                <PollOption fieldName="opt1" displayName="Option 1" />
                <PollOption fieldName="opt2" displayName="Option 2" />
                <PollOption fieldName="opt3" displayName="Option 3" />
                <PollOption fieldName="opt4" displayName="Option 4" />

                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className={pageStyles["button-create-poll"]}
                    style={{
                      padding: "10px",
                      backgroundColor: "#ddd",
                      borderRadius: "10px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
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