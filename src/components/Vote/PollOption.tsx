import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Field, useField } from "formik";
import classNames from "classnames";
import styles from "../../styles/Polls.module.css";

type PollOptionProps = {
  fieldName: string;
  fieldValue: string;
  numVotes: number;
};

export default function PollOption({
  fieldName,
  fieldValue,
  numVotes,
}: PollOptionProps) {
  const [field, meta, helpers] = useField("vote");

  // console.log(field);

  const buttonClasses = classNames({
    "poll-button": true,
    "poll-button-selected": field.value === fieldValue,
  });

  return (
    <>
      <div className={styles["input-div-poll-vote"]}>
        <div className={buttonClasses} onClick={() => helpers.setValue(fieldValue)}>
          {fieldValue}
        </div>
        {/* <label htmlFor="text" className={styles["label-poll-vote"]}>
            <Field
              style={{ display: "none" }}
              // className={styles["text-input-poll-vote"]}
              id={fieldName}
              type="radio"
              name="vote"
              value={fieldValue}
            />
            {fieldValue}
          </label> */}
        <span className={`${styles["span-poll-vote"]}`}>{numVotes}</span>
      </div>
    </>
  );
}
