import { AuthProvider } from "@context/auth";
//types
import { AppProps } from "next/app";
//components
import { Layout } from "@containers/Layout";
//css
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
