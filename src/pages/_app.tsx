import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  WagmiConfig,
  createClient,
  configureChains,
  // chain,
  Chain,
} from "wagmi";
import { optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import styles from "../styles/Home.module.css";
import SiteHead from "components/SiteHead";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export const { chains, provider } = configureChains([optimism], [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={pageProps.session}>
        <SiteHead />
        <main className={styles.main}>
          <Navbar />

          <Component {...pageProps} />
          <Footer />
        </main>
      </SessionProvider>
    </WagmiConfig>
  );
}
