import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainListing from "./components/MainListing"
import SideBar from "./components/SideBar"
import CompleteDesc from "./components/CompleteDesc"
import 'remixicon/fonts/remixicon.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <SideBar />
        <MainListing />
      </div>
  },
  {
    path: "/desc/:id",
    element:
      <div>
        <SideBar />
        <CompleteDesc />
      </div>
  }
])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App