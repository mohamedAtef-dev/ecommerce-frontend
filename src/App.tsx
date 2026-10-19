import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header1 from "./components/header/Header1"
import Header2 from "./components/header/header2"
import Header3 from "./components/header/header3"
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";



function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>

        <CssBaseline />

          <Header1 />
          <Header2 />
          <Header3 />

          <Box sx={{bgcolor: theme.palette.bg.main}}>

            <Hero />
            <Main />
          </Box>

          <Footer />

          <ScrollToTop />

      </ThemeProvider>

    </ColorModeContext.Provider>

  )
}

export default App;
