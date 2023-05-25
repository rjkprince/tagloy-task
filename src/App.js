import React, { lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Header from "./components/Header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Images = lazy(() => import("./pages/Images"));
const Checkboxes = lazy(() => import("./pages/Checkboxes"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route
        path="images"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Images />
          </Suspense>
        }
      />
      <Route
        path="checkboxes"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Checkboxes />
          </Suspense>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
