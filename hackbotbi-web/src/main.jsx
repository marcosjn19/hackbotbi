import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import './normalize.css'
import Login from './Login/Login';
import Landing from './Landing/Landing';
import Clients from './Clients/Clients';
import NewClientForm from './Clients/NewClientForm';
import ProtectedRoute from './Utils/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: ( <Login/> ),
  },
  {
    path:"/index",
    element: ( <ProtectedRoute element = { <Landing/> } /> ),
  },
  {
    path:"/myclients",
    element: ( <ProtectedRoute element = { <Clients/> } /> ),
  },
  {
    path:"/newclient",
    // element: <NewClientForm/>
    element: ( <ProtectedRoute element = { <NewClientForm/> } /> ),
  },
  {
    path:"/logout",
    element: (<Login/>)
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
