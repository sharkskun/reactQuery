import { Disclosure } from "@headlessui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile, CgDatabase, CgLogOut } from "react-icons/cg";
import { useRouter } from "next/router";

function SideNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    console.log("AccessToken after logout:", localStorage.getItem("accessToken"));
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <div className="h-screen bg-white w-60 flex-shrink-0 flex flex-col">
      <Disclosure as="nav" className="flex flex-col flex-1">
        {/* Hamburger Button */}
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-4 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group hover:bg-gray-700">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>

        {/* Sidebar Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-300 pb-2 w-full">
              Dashboard
            </h1>
            <div className="my-4 border-b border-gray-300 pb-3">
              <div className="flex mb-4 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg">
                <CgProfile className="text-2xl text-gray-900 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  My Profile
                </h3>
              </div>
            </div>
            <div className="my-4 border-b border-gray-300 pb-3">
              <div className="flex mb-4 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg">
                <CgDatabase className="text-2xl text-gray-900 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Databases
                </h3>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div
            className="mt-auto flex justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg"
            onClick={handleLogout}
          >
            <CgLogOut className="text-2xl text-gray-900 group-hover:text-red-500" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              Logout
            </h3>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
