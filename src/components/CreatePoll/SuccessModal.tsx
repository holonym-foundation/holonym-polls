import React, { useState } from "react";
import Modal from "react-modal";
import CopyToClipboard from "react-copy-to-clipboard";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#01010d", // 1, 1, 13
    borderRadius: "10px",
  },
};

export default function SuccessModal({
  pollId,
  visible,
  onClose,
}: {
  pollId: string;
  visible: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        // isOpen={modalIsOpen}
        isOpen={visible}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="header-text">Poll Created</h2>
          <p>Share your poll with others!</p>
        </div>
        <div style={{ padding: "20px", margin: "10px", backgroundColor: "#11111d" }}>
          <code>{`http://localhost:3000/polls/${pollId}`}</code>
          <CopyToClipboard
            text={`http://localhost:3000/polls/${pollId}`}
            onCopy={() => setCopied(true)}
          >
            <button
              className="secondary-button"
              style={{ marginLeft: "20px", minWidth: "100px" }}
            >
              {!copied ? "Copy" : "Copied!"}
            </button>
          </CopyToClipboard>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </Modal>
    </div>
  );
}
