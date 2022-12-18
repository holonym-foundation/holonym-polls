import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styles from "../styles/Home.module.css";
import pageStyles from "../styles/Polls.module.css";
import Navbar from "../components/Navbar";
import PollOption from "../components/CreatePoll/PollOption";

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
      <div className={styles.center}>
        <div style={{ textAlign: "center" }}>
          <h2 className="header-text">Create Poll</h2>
        </div>

        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <PollOption fieldName="caption" fieldValue="Caption" />
              <PollOption fieldName="opt1" fieldValue="Option 1" />
              <PollOption fieldName="opt2" fieldValue="Option 2" />
              <PollOption fieldName="opt3" fieldValue="Option 3" />
              <PollOption fieldName="opt4" fieldValue="Option 4" />

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
      <div></div>
      <div></div>
    </>
  );
}
