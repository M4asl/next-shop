import dynamic from "next/dynamic";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/default";
import Layout from "../components/Layout/main";
import GlobalStyles from "../styles/globals";
const Toggle = dynamic(() => import("../components/Toggle"), { ssr: false });
import { useDarkMode } from "../hooks/useDarkMode";
import { wrapper } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCartItems } from "../redux/actions/cartActions";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, themeToggler] = useDarkMode();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getCartItems());
    }
  }, [router]);

  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Toggle theme={theme} toggleTheme={themeToggler} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
