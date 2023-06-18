import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, { RootIndex } from "./pages/Root";
import FishPage from "./pages/Fish";
import BadgePage from "./pages/Badge";
import CtfPage from "./pages/CTF";
import GeocachingPage from "./pages/Geocaching";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <RootIndex />,
      },
      {
        path: "fish",
        element: <FishPage />,
      },
      {
        path: "badge",
        element: <BadgePage />,
      },
      {
        path: "ctf",
        element: <CtfPage />,
      },
      {
        path: "geocaching",
        element: <GeocachingPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
