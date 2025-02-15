import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import { GoogleOAuthProvider } from "@react-oauth/google";

import ErrorPage from "./ErrorPage";

// Faculty Routes
import Index from "./routes";
import Home, { loader as homeLoader } from "./routes/home";

import Start from "./routes/home/start";
import Semester, { loader as semesterLoader } from "./routes/home/semester";
import GradeTable, {
  loader as gradeTableLoader,
} from "./routes/home/gradeTable";
import Upload, { loader as uploadLoader } from "./routes/home/upload";
import PrintGradeSheet, { loader as printLoader } from "./routes/home/Print";

// Admin Routes
import Admin, { loader as adminLoader } from "./routes/admin/Index";
import GradeSubmission, {
  loader as gradesLoader,
} from "./routes/admin/GradeSubmission";
import Users, { loader as usersLoader } from "./routes/admin/Users";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: <Home />,
    loader: homeLoader,
    children: [
      { index: true, element: <Start /> },
      {
        path: "/home/:code",
        element: <Semester />,
        loader: semesterLoader,
        children: [
          {
            path: "/home/:code/:class_code",
            element: <GradeTable />,
            loader: gradeTableLoader,
          },
          {
            path: "/home/:code/upload/:class_code",
            element: <Upload />,
            loader: uploadLoader,
          },
          {
            path: "/home/:code/print/:class_code",
            element: <PrintGradeSheet />,
            loader: printLoader,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    loader: adminLoader,
    element: <Admin />,
    errorElement: <h1>Error AdminPage</h1>,
    children: [
      { index: true, element: <Start /> },
      {
        path: "grades",
        element: <GradeSubmission />,
        loader: gradesLoader,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="716180471328-k91kdip1kj2024jkj5tporlkehffbnb9.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
