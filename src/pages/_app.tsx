import {SessionProvider} from "next-auth/react";
import { Box, createTheme, CssBaseline, IconButton, ThemeProvider, useTheme } from "@mui/material";
import React from "react";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { AppProps } from 'next/app';
import { store } from "@/store/features/store";
import { Provider } from 'react-redux'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = ({
    Component, pageProps: {session, ...pageProps}
}: AppProps) => {
        const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
        const colorMode = React.useMemo(
          () => ({
            toggleColorMode: () => {
              setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
          }),
          [],
        );
      
        const darkThemeChosen = React.useMemo(
          () =>
            createTheme({
                ...darkTheme,
            }),
          [mode],
        );
        const lightThemeChosen = React.useMemo(
            () =>
                createTheme({
                    ...lightTheme,
                }),
            [mode],
        ); 
    return (
        <Provider store={store}>
             <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}>
                <SessionProvider session={session}>
                    <CssBaseline />
                    <Header ColorModeContext={ColorModeContext}/>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
        </Provider>
    )
}

export default App;