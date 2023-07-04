import "../styles/globals.css";
import { LoaderProvider } from "../contexts/LoadingContext";

export default function App({ Component, pageProps }) {
  return (
    <LoaderProvider>
      <Component {...pageProps} />
    </LoaderProvider>
  );
}
