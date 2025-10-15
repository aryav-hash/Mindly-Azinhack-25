import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './shared/RootLayout'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Resources from './pages/Resources'
import About from './pages/About'
import Booking from './pages/Booking'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chatbot', element: <Chatbot /> },
      { path: 'resources', element: <Resources /> },
      { path: 'about', element: <About /> },
      { path: 'booking', element: <Booking /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


