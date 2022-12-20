import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

type ButtonText = "Connect wallet" | "Sign in" | "Disconnect";

export default function ConnectWalletButton() {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnectAsync } = useDisconnect();
  const [buttonText, setButtonText] = useState<ButtonText>();

  // Setting button text in useEffects prevents error: "Text content does not match server-rendered HTML"
  useEffect(() => {
    if (!isConnected) {
      setButtonText("Connect wallet");
    } else {
      setButtonText("Disconnect");
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected) {
      setButtonText("Connect wallet");
    } else {
      setButtonText("Disconnect");
    }
  }, []);

  return (
    <>
      <button
        className="secondary-button"
        onClick={(e) => {
          e.preventDefault();
          if (!isConnected) {
            connectAsync().then(() => console.log("connect successful"));
          } else {
            disconnectAsync().then(() => console.log("disconnect successful"));
          }
        }}
      >
        {/* Sign-in */}
        {/* {!isConnected ? "Connect wallet" : !session ? "Sign-in" : "Disconnect"} */}
        {/* {!isConnected ? "Connect wallet" : "Disconnect"} */}
        {buttonText}
      </button>
    </>
  );
}
