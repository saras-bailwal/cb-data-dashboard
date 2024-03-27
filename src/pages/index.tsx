import React from 'react';
import Dashboard from "@/pages/dashboard";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Login from "@/components/Login";
// import Login from "@pages/login";
import Head from "next/head";
import {useSession} from "next-auth/react";
import scss from "@/pages/Home.module.scss";

const Home: React.FC = () => {
    const {data: session} = useSession();
  return (
    <>
      <main className={scss.main}>
        { session && <Dashboard />}
        { !session && <Login />}
      </main></>
  );
}

export default Home;
