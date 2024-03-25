import styles from "./page.module.css";
import Dashboard from "@/pages/dashboard";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
// import Login from "@pages/login";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Data Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideMenu />
        <Dashboard />
      </main></>
  );
}
