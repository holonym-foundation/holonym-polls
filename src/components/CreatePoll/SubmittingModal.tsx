import React, { useState } from "react";
import Modal from "react-modal";
import { BarLoader } from "react-spinners";

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

export default function SubmittingModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose?: () => void;
}) {
  return (
    <div>
      <Modal
        isOpen={visible}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ textAlign: "center", minWidth: "25vw", minHeight: "10vh" }}>
          <h2 className="header-text">Creating poll</h2>
          <center style={{ marginTop: "25px" }}>
            <BarLoader width="100%" color="#21212d" />
          </center>
        </div>
        <div style={{ padding: "20px", margin: "10px", minHeight: "50px" }}></div>
        {/* <div style={{ textAlign: "center" }}>
          <span>Close</span>
        </div> */}
      </Modal>
    </div>
  );
}
