import { defaultFont } from "shared/fonts";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";

type ButtonText = "Connect wallet" | "Sign in" | "Disconnect";

export default function SiweButton() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { disconnectAsync } = useDisconnect();
  const [buttonText, setButtonText] = useState<ButtonText>();

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      }).then(() => console.log("sign in succesful"));
    } catch (err) {
      console.error(err);
      //   window.alert(err);
    }
  };

  // Setting button text in useEffects prevents error: "Text content does not match server-rendered HTML"
  useEffect(() => {
    console.log("session status", status);
    if (!isConnected) {
      setButtonText("Connect wallet");
    }
    if (!session) {
      setButtonText("Sign in");
    }
    if (isConnected && session) {
      setButtonText("Disconnect");
    }
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected, session]);

  useEffect(() => {
    if (!isConnected) {
      setButtonText("Connect wallet");
    } else if (!session) {
      setButtonText("Sign in");
    } else {
      setButtonText("Disconnect");
    }
  }, []);

  return (
    <>
      <button
        className={defaultFont.className}
        onClick={(e) => {
          e.preventDefault();
          if (!isConnected) {
            connectAsync().then(() => console.log("connect successful"));
          } else if (!session) {
            handleLogin();
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
