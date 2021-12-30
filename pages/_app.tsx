import "../styles/globals.css";
import { AppProps } from "next/app";
import { store } from "../src/store";
import { StoreProvider } from "easy-peasy";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
