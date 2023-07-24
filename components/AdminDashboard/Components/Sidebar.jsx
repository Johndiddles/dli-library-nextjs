import Link from "next/link";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { BiBookAdd, BiSupport } from "react-icons/bi";
import { useAuthContext } from "../../../pages/context/authContext";
import { IoLogOut } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { logout } = useAuthContext();
  return (
    <div className="md:w-[240px] min-h-screen h-screen bg-slate-900 text-slate-200 overflow-hidden flex flex-col gap-4 ">
      <div className="w-full flex flex-col">
        <div className="px-4 py-6 font-raleway text-slate-200 font-bold shadow-lg">
          MENU
        </div>
        <div className="w-full flex flex-col px-2 py-3">
          <SidebarLink
            url="/admin/dashboard/index"
            slug="index"
            name="Dashboard"
            icon={<MdSpaceDashboard />}
          />
          <SidebarLink
            url="/admin/dashboard/add-module"
            slug="add-module"
            name="Add Module"
            icon={<BiBookAdd />}
          />
          <SidebarLink
            url="/admin/dashboard/departments"
            slug="departments"
            name="Departments"
            icon={<HiBuildingOffice2 />}
          />
          <SidebarLink
            url="/admin/dashboard/support"
            slug="support"
            name="Support"
            icon={<BiSupport />}
          />
          <SidebarLink
            url="/admin/dashboard/users"
            slug="users"
            name="Users"
            icon={<FaUserFriends />}
          />

          <div
            className="w-full py-3 px-4 bg-transparent rounded text-slate-500 font-semibold hover:bg-slate-500 hover:bg-opacity-50 hover:backdrop-blur-md hover:text-slate-200 duration-300 flex gap-4 items-center cursor-pointer"
            onClick={logout}
          >
            <span>
              <IoLogOut />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarLink = ({ url, name, icon, slug }) => {
  const router = useRouter();

  const { page } = router.query;

  return (
    <Link href={url} className="">
      <div
        className={`w-full py-3 px-4 bg-transparent rounded  ${
          page === slug ? "text-slate-100" : "text-slate-500"
        } font-semibold hover:bg-slate-500 hover:bg-opacity-50 hover:backdrop-blur-md hover:text-slate-200 duration-300 flex gap-4 items-center`}
      >
        <span>{icon}</span>
        <span>{name}</span>
      </div>
    </Link>
  );
};
