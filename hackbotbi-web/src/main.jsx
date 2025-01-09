import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import Login from './Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: ( <Login/> ),
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
