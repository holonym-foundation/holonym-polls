import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { defaultFont } from "shared/fonts";
import styles from "../../styles/Polls.module.css";
import { Field, useField } from "formik";

type PollOptionProps = {
  fieldName: string;
  fieldValue: string;
};

export default function PollOption({ fieldName, fieldValue }: PollOptionProps) {
  const [field, meta] = useField(fieldName);

  return (
    <>
      <div className={defaultFont.className}>
        <div className={styles["input-div-create-poll"]}>
          <label htmlFor="text" className={styles["label-create-poll"]}>
            {fieldValue}
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
      </div>
    </>
  );
}
