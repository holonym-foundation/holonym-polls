import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../../styles/Polls.module.css";
import { Field, useField } from "formik";

const inter = Inter({ subsets: ["latin"] });

type PollOptionProps = {
  fieldName: string;
  displayName: string;
};

export default function PollOption({ fieldName, displayName }: PollOptionProps) {
  const [field, meta] = useField(fieldName);

  console.log(field);

  return (
    <>
      <div className={styles["input-div-create-poll"]}>
        <label htmlFor="text" className={styles["label-create-poll"]}>
          {displayName}
        </label>
        <Field
          className={styles["text-input-create-poll"]}
          id={fieldName}
          type="text"
          {...field}
          // value={field.value}
        />
        {/* <input
          className={styles["text-input-poll-vote"]}
          id={fieldName}
          type={inputType}
          {...field}
        /> */}
      </div>
    </>
  );
}
