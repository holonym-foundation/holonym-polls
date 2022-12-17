import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { defaultFont } from "shared/fonts";
import styles from "../../styles/Polls.module.css";
import { Field, useField } from "formik";

type PollOptionProps = {
  fieldName: string;
  displayName: string;
  numVotes: number;
};

export default function PollOption({
  fieldName,
  displayName,
  numVotes,
}: PollOptionProps) {
  const [field, meta] = useField(fieldName);

  return (
    <>
      <div className={defaultFont.className}>
        <div className={styles["input-div-poll-vote"]}>
          <label htmlFor="text" className={styles["label-poll-vote"]}>
            {displayName}
          </label>
          <Field
            className={styles["text-input-poll-vote"]}
            id={fieldName}
            type="radio"
            name="vote"
            value={displayName}
          />
          {/* <input
          className={styles["text-input-poll-vote"]}
          id={fieldName}
          type={inputType}
          {...field}
        /> */}
          <span className={styles["span-poll-vote"]}>{numVotes}</span>
        </div>
      </div>
    </>
  );
}
