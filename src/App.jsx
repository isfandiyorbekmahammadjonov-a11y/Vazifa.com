import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginLayout from "./Layouts/LoginLayout";
const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <LoginLayout />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
