import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppShell from "@/components/layouts/Appshell";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const is404Page = router.pathname === "/404";

  return is404Page ? (
    <Component {...pageProps} />
  ) : (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}