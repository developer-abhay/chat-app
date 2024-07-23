import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
  // </React.StrictMode>
);
