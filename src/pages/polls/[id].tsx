import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { useAccount, useSignMessage } from "wagmi";
import styles from "../../styles/Home.module.css";
import pageStyles from "../../styles/Polls.module.css";
import type { Poll } from "../../types/base";
import PollOption from "../../components/Vote/PollOption";
import Navbar from "../../components/Navbar";

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
  const router = useRouter();
  const refreshData = () => {
    console.log("refreshing");
    router.replace(router.asPath);
    console.log("refreshed");
  };
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage({
    message: poll.id,
    onError: (err) => console.log(err),
  });

  async function onSubmit(
    values: PollValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) {
    if (!address) return alert("Please connect your wallet first");
    const signature = await signMessageAsync({ message: poll.id });
    const optNameToNum = Object.fromEntries(
      Object.entries(poll)
        .filter((item) => item[0].includes("opt"))
        .map((item) => [item[1], parseInt(item[0].replace("opt", ""))])
    );

    const vote = optNameToNum[values.vote];
    const reqBody = {
      id: poll.id,
      option: vote,
      address: address,
      signature: signature,
    };
    const resp = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await resp.json();

    refreshData();
    alert(JSON.stringify({ values, data }, null, 2));
    setSubmitting(false);
  }

  return (
    <>
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
                  fieldValue={poll.opt1 ?? "Option 1"}
                  numVotes={poll.opt1Total ?? 0}
                />
                <PollOption
                  fieldName="opt2"
                  fieldValue={poll.opt2 ?? "Option 2"}
                  numVotes={poll.opt2Total ?? 0}
                />
                <PollOption
                  fieldName="opt3"
                  fieldValue={poll.opt3 ?? "Option 3"}
                  numVotes={poll.opt3Total ?? 0}
                />
                <PollOption
                  fieldName="opt4"
                  fieldValue={poll.opt4 ?? "Option 4"}
                  numVotes={poll.opt4Total ?? 0}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit">Submit</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Link href="/">
        <button className="secondary-button">Back</button>
      </Link>
    </>
  );
}
