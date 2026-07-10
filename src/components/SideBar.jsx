import { NavLink } from "react-router-dom"
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

export default function SideBar () {

  return (
    <>
      <div className="  h-16 w-[screen-4] px-6 py-4 z-50 flex gap-2 lg:gap-4 justify-between m-2 select-none rounded-full bg-gray-100">
        <MagneticButton>
          <div className="flex gap-2 items-center justify-center">
            <i className="ri-shopping-bag-fill text-lg"></i>
            <p className="hidden lg:block font-bold text-purple-700">Shop2Ship</p>
          </div>
        </MagneticButton>

        <div className="border-2 flex bg-white  justify-between border-gray-300 w-25 lg:w-120 lg:ml-40 px-2 py-1 rounded-xl">
          <input type="text" placeholder="Search"
          className="w-15 lg:w-110 outline-none"/>
          <i class="ri-search-line"></i>
        </div>

        <div className="flex gap-4 font-semibold">
          <MagneticButton>
            <div className="flex gap-2">
              <NavLink to={"/desc/1"} className="block lg:hidden">Desc</NavLink>
              <NavLink to={"/desc/1"} className="hidden lg:block">Description</NavLink>
            </div>
          </MagneticButton>

          <MagneticButton>
            <div className="flex">
              <NavLink to={"/"} className="block lg:hidden">List</NavLink>
              <NavLink to={"/"} className="hidden lg:block">MainListing</NavLink>
            </div>
          </MagneticButton>

          <MagneticButton>
              <div className="flex gap-1">
                <i class="ri-user-line"></i>
                <p className="hidden lg:block">My Account</p>
                <i className="ri-arrow-drop-down-line hidden lg:block"></i>
              </div>
          </MagneticButton>

        </div>
      </div>
    </>
  )
}