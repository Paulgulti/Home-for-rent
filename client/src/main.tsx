import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import './index.css'
// import App from "./App.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//   },
// ]);

// const root = document.getElementById("root");

// ReactDOM.createRoot(root!).render(
//   <RouterProvider router={router} />,
// );
