import { NavLink } from "react-router-dom";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftIcon,
  TagIcon,
  ArrowRightStartOnRectangleIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="sidebar-toggle"
        className="drawer-overlay w-screen"
      ></label>
      <div className="flex min-h-full w-64 flex-col justify-between bg-base-100 p-0 text-base-content">
        <ul className="menu gap-1">
          <div className="mb-4 flex h-16 w-full flex-col items-center justify-center gap-0">
            <div className="logo flex items-center justify-center gap-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <h1 className="text-lg font-bold">Intent manager</h1>
            </div>
            <p className="text-xs text-gray-500">v0.0.1</p>
          </div>
          <li>
            <NavLink
              to="/intents"
              className={({ isActive }) =>
                `flex h-12 items-center justify-start ${isActive ? "bg-base-300" : ""}`
              }
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
              Intents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classify"
              className={({ isActive }) =>
                `flex h-12 items-center justify-start ${isActive ? "bg-base-300" : ""}`
              }
            >
              <BeakerIcon className="h-6 w-6" />
              Classify
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Entities"
              className={`pointer-events-none flex h-12 items-center justify-start opacity-50`}
            >
              <TagIcon className="h-6 w-6" />
              Entities
            </NavLink>
          </li>
        </ul>
        <ul className="menu">
          <li>
            <NavLink
              to="/signin"
              className={`pointer-events-none flex h-12 items-center justify-start opacity-50`}
            >
              <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              Sign In
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
