import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import RecentsPage from "./pages/RecentsPage";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favourites", element: <FavouritesPage /> },
      { path: "recents", element: <RecentsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
