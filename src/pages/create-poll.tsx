import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ethers } from "ethers";
import {
  useNetwork,
  useSwitchNetwork,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import styles from "styles/Home.module.css";
import PollOption from "components/CreatePoll/PollOption";
import SuccessModal from "components/CreatePoll/SuccessModal";
import SubmittingModal from "components/CreatePoll/SubmittingModal";

type CreatePollValues = {
  caption: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
};

const initialValues: CreatePollValues = {
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

function useCreatePoll() {
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [pollId, setPollId] = useState<string>("");
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { config } = usePrepareSendTransaction({
    chainId: 420,
    request: {
      chainId: 420,
      to: "0xc8834c1fcf0df6623fc8c8ed25064a4148d99388",
      value: ethers.constants.WeiPerEther.div(1000000), // TODO: change `1000000` to `1200` for production
    },
  });
  const { sendTransactionAsync } = useSendTransaction(config);

  return {
    successModalVisible,
    setSuccessModalVisible,
    pollId,
    setPollId,
    chain,
    switchNetworkAsync,
    sendTransactionAsync,
  };
}

export default function CreatePoll() {
  const {
    successModalVisible,
    setSuccessModalVisible,
    pollId,
    setPollId,
    chain,
    switchNetworkAsync,
    sendTransactionAsync,
  } = useCreatePoll();

  const [submitting, setSubmitting] = useState<boolean>(false); // TODO: Use formik context instead

  async function onSubmit(
    values: CreatePollValues,
    { resetForm }: FormikHelpers<CreatePollValues>
  ) {
    try {
      setSubmitting(true);
      // Switch network to Optimism Goerli, and send transaction
      if (chain?.id !== 420) await switchNetworkAsync?.(420);
      const tx = await sendTransactionAsync?.();
      await tx?.wait();
      if (!tx) return alert('Transaction failed. Please try again."');
      // Create poll by sending POST request
      const resp = await fetch("http://localhost:3000/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          // txHash: "0x680373d74807f2ebb13e7cb85eaed47203267391b0b4b6c5b98e7fb44c0d85ad",
          txHash: tx.hash,
        }),
      });
      const data = await resp.json();

      resetForm({
        values: initialValues,
        isSubmitting: false,
      });
      setPollId(data.id);
      setSubmitting(false);
      setSuccessModalVisible(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (chain?.id !== 420 && switchNetworkAsync) {
      switchNetworkAsync(420);
    }
  }, [chain?.id, switchNetworkAsync]);

  return (
    <>
      <div className={styles.center}>
        <div style={{ textAlign: "center" }}>
          <h2 className="header-text">Create Poll</h2>
        </div>

        <div>
          <SubmittingModal
            visible={submitting}
            // onClose={() => setSubmitting(false)}
          />
          <SuccessModal
            pollId={pollId}
            visible={successModalVisible}
            onClose={() => setSuccessModalVisible(false)}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialStatus="empty"
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
