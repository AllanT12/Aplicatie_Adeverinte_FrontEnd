import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ContextProvider} from "./context/ContextProvider.jsx";
import router from "./router.jsx";
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
