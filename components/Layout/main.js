import Head from "next/head";
import NavBar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Shop ecommerce" />
        <meta property="og:title" content="ApplyShop" />
        <meta property="og:site_name" content="ApplyShop" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <title>ApplyShop</title>
      </Head>

      <NavBar />
      <ToastContainer position="bottom-center" autoClose={5000} />

      {children}

      <Footer />
    </>
  );
};

export default Main;
