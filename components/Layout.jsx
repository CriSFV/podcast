import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.sass";
import Loader from "./Loader";

export default function Layout({ children, title, description, isLoading }) {
  const Loading = () => {
    if (isLoading) {
      return <Loader />;
    }
  };
  const HeadPage = () => {
    return (
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={description} />
      </Head>
    );
  };
  return (
    <div className={styles.ppal_container}>
      <HeadPage />
      <header>
        <div className={styles.loader__container}>{Loading()}</div>
        <nav>
          <Link href={"/"} className={styles.title}>
            Podcaster
          </Link>
        </nav>
        <hr className={styles.separator} />
      </header>
      <main>{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Podcast Web",
  description: "Podcast Web Site",
  isLoading: false,
};
