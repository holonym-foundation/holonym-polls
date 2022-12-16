import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { useFormik } from "formik";
import styles from "../../styles/Home.module.css";
import pageStyles from "../../styles/Polls.module.css";
import type { Poll } from "../../types/base";
import FormInput from "../../components/FormInput";
import Header from "../../components/Header";

const inter = Inter({ subsets: ["latin"] });

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
            <h3>{poll.caption}</h3>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <FormInput option={poll.opt1 ?? "Option 1"} inputType="radio" />
              <FormInput option={poll.opt2 ?? "Option 2"} inputType="radio" />
              <FormInput option={poll.opt3 ?? "Option 3"} inputType="radio" />
              <FormInput option={poll.opt4 ?? "Option 4"} inputType="radio" />
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
