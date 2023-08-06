import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CtfPage from "./pages/CTF";
import DinoPage from "./pages/Dino";
import EmojiPage from "./pages/Emoji";
import FishPage from "./pages/Fish";
import TreasureHuntPage from "./pages/TreasureHunt";
import PopcatPage from "./pages/Popcat";
import Root, { RootIndex } from "./pages/Root";

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
        path: "popcat",
        element: <PopcatPage />,
      },
      {
        path: "dino",
        element: <DinoPage />,
      },
      {
        path: "emoji",
        element: <EmojiPage />,
      },
      {
        path: "ctf",
        element: <CtfPage />,
      },
      {
        path: "treasure-hunt",
        element: <TreasureHuntPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
