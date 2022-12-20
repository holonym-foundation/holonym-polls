import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
      <div>
        <div className={styles["input-div-create-poll"]}>
          <label htmlFor="text" className={styles["label-create-poll"]}>
            {fieldValue}
          </label>
          <Field
            className={`${styles["text-input-create-poll"]} text-field`}
            id={fieldName}
            type="text"
            autoComplete="off"
            {...field}
            // value={field.value}
          />
        </div>
      </div>
    </>
  );
}
