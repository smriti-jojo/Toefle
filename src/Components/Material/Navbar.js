import { Fragment, useEffect, useLayoutEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import eupheus from "../assest/eupheus.png";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ status }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const navigation = [
    // {
    //   name: "Practice",
    //   href: "/junior_playlist",
    //   // onclick: false,
    //   current: status === "home" ? true : false,
    // },

    {
      name: "Logout",
      href: "/",
      onclick: status === "Logout" ? { handleLogOut } : false,
      current: false,
    },
  ];

  return (
    <Disclosure as="nav" className=" bg-[#C2DEDC]">
      {({ open }) => (
        <>
          <div className="lg:px-10">
            <div className="relative flex items-center  h-[5vh] py-7">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden w-[150px]"
                    src={eupheus}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block  w-[150px]"
                    src={eupheus}
                    alt="Workflow"
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex justify-end space-x-4 font-montserrat ">
                    {navigation.map((item) => (
                      // <Link to={`${item.href}`}>
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          if (item.name === "Logout") {
                            Cookies.remove("token");
                          }
                        }}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-[#146C94] hover:bg-gray-700 hover:text-white",
                          "px-3 py-1 rounded-md text-xl font-bold"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        // onClick={
                        //   item.name === "Logout"
                        //     ? Cookies.remove("token")
                        //     : ""
                        // }
                      >
                        {item.name}
                      </a>
                      // </Link>
                    ))}
                  </div>
                </div>

                {/* Profile dropdown */}
                {/* <Menu as="div" className="ml-3 relative z-50">
                  <div>
                    <Menu.Button className="bg-gray-800 space-x-4  z-40 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white text-xl font-bold">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Change Password
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 font-montserrat">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-[#c0b8b8] hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-xl font-bold"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
