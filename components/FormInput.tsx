import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Polls.module.css";
import { useFormik } from "formik";

const inter = Inter({ subsets: ["latin"] });

type FormInputProps = {
  option: string;
  inputType: "radio" | "text";
};

export default function FormInput({ option, inputType }: FormInputProps) {
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
      <div className={styles["poll-input-div"]}>
        <label htmlFor="text" className={styles["poll-form-label"]}>
          {option}
        </label>
        <input
          className={styles["poll-form-input"]}
          id="text"
          name={option}
          type={inputType}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
    </>
  );
}
