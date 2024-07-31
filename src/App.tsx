import DashBoard from './pages/DashBoard';
import LandingPage from './pages/LandingPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path:'/todo',
      element:<DashBoard/>

    },
    {
     path:'/',
     element:<LandingPage/>
    },
  ]

  )
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
