import LoginPage from "@/app/login/LoginPage";
import "@/core/styles/globals.css"
import Head from "next/head";

export default function login(){
  return (
    <>
    <Head>
        <title>Piggy | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <LoginPage />
    </>
  )
}