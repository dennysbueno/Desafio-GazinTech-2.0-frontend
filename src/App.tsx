import { Box, CSSReset, Grid, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import { Main } from "./pages/Main";
import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <Main />
      </Grid>
    </Box>
  </ThemeProvider>
);

export default App;
