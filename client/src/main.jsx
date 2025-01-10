import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Forgot from "./components/Forgot.jsx";
import Login from "./components/Login.jsx";
import Reset from "./components/Reset.jsx";
import Register from "./components/Register.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Forgot />,
        },
        {
          path: "reset/:token",
          element: <Reset />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "*",
          element: (
            <Link to="/">
              <div className="space-y-10">
                <p className="text-center font-mono">unspecified url...!</p>
                <p className="text-center cursor-pointer p-4 rounded-xl bg-red-500 hover:bg-red-600 ">
                  Go Back...!
                </p>
              </div>
            </Link>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }}>
    <App />
  </RouterProvider>
);
