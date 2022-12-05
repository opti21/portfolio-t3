import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <PlausibleProvider domain="opti21.dev">
      <Component {...pageProps} />
      {/* <SessionProvider session={session}>
      </SessionProvider> */}
    </PlausibleProvider>
  );
};

export default trpc.withTRPC(MyApp);
