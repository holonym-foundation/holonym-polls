import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styles from "../../styles/Home.module.css";
import pageStyles from "../../styles/Polls.module.css";
import type { Poll } from "../../types/base";
import PollOption from "../../components/Vote/PollOption";
import Header from "../../components/Header";

const inter = Inter({ subsets: ["latin"] });

type PollValues = {
  vote: string;
};

const initialValues = {
  vote: "",
};

const validationSchema = Yup.object().shape({
  vote: Yup.string().required("Required"),
});

type PollPropsContext = {
  params: {
    id: string;
  };
};

export async function getStaticPaths() {
  const resp = await fetch("http://localhost:3000/api/polls");
  const data = await resp.json();

  const paths = data.map((poll: Poll) => ({ params: { id: poll.id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: PollPropsContext) {
  const id = context.params.id;

  const resp = await fetch(`http://localhost:3000/api/polls/${id}`);
  const data = await resp.json();

  return {
    props: {
      poll: data,
    },
  };
}

export default function Poll({ poll }: { poll: Poll }) {
  async function onSubmit(
    values: PollValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) {
    const optNameToNum = Object.fromEntries(
      Object.entries(poll)
        .filter((item) => item[0].includes("opt"))
        .map((item) => [item[1], parseInt(item[0].replace("opt", ""))])
    );

    const vote = optNameToNum[values.vote];
    const reqBody = {
      id: poll.id,
      option: vote,
      address: "0x123",
      signature: "0x456",
    };
    const resp = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await resp.json();

    alert(JSON.stringify({ values, poll, data }, null, 2));
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
            <h3>{poll.caption}</h3>
          </div>

          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div role="group">
                  <PollOption
                    fieldName="opt1"
                    displayName={poll.opt1 ?? "Option 1"}
                    numVotes={poll.opt1Votes ?? 0}
                  />
                  <PollOption
                    fieldName="opt2"
                    displayName={poll.opt2 ?? "Option 2"}
                    numVotes={poll.opt2Votes ?? 0}
                  />
                  <PollOption
                    fieldName="opt3"
                    displayName={poll.opt3 ?? "Option 3"}
                    numVotes={poll.opt3Votes ?? 0}
                  />
                  <PollOption
                    fieldName="opt4"
                    displayName={poll.opt4 ?? "Option 4"}
                    numVotes={poll.opt4Votes ?? 0}
                  />
                </div>
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
