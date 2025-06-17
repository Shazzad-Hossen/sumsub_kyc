import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import Verify from './pages/Verify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/verify-kyc",
    element: <Verify/>,
  },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />

)
