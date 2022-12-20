import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  WagmiConfig,
  createClient,
  configureChains,
  // chain,
  Chain,
} from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Modal from "react-modal";
import styles from "../styles/Home.module.css";
import SiteHead from "components/SiteHead";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export const { chains, provider } = configureChains(
  [optimism, optimismGoerli],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

Modal.setAppElement("#__next");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SiteHead />
      <main className={styles.main}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </WagmiConfig>
  );
}
