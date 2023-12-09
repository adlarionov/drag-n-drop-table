import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoadFile from "./pages/LoadFile/index.tsx";
import Table from "./pages/Table/index.tsx";
import Error from "./pages/Error/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/load" />,
  },
  {
    path: "/load",
    element: <LoadFile />,
    errorElement: <Error />,
  },
  {
    path: "/table",
    element: <Table />,
    errorElement: <Error />,
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
