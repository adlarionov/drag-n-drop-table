import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoadFile from "./pages/LoadFile/index.tsx";
import Table from "./pages/Table/index.tsx";
import Error from "./pages/Error/index.tsx";

const router = createBrowserRouter([
  {
    path: "/load",
    element: <LoadFile />,
  },
  {
    path: "/table",
    element: <Table />,
  },
  {
    path: "/*",
    element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
