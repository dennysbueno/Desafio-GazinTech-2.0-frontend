import { Box, ChakraProvider, CSSReset, Grid, ThemeProvider } from "@chakra-ui/react";
import { Main } from "./pages/Main";
import theme from "./theme";

const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <Main />
      </Grid>
    </Box>
  </ChakraProvider>
);

export default App;
