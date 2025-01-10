import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import Login from './Login/Login';
import Landing from './Landing/Landing';

const router = createBrowserRouter([
  {
    path: "/",
    element: ( <Login/> ),
  },
  {
    path:"/index",
    element: ( <Landing/>),
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
