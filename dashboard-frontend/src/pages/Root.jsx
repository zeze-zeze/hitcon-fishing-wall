import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import hitconLogo from "../assets/hitcon-logo.svg";
import { navigation } from "./routes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Root() {
  const location = useLocation();
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="block md:hidden px-4 text-base font-medium text-white">
                      {
                        navigation.find((i) => i.href === location.pathname)
                          .name
                      }
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          // <Link to={`contacts/1`}>Your Name</Link>
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              location.pathname === item.href
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={
                              location.pathname === item.href
                                ? "page"
                                : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden border-solid border-t border-gray-700">
                {({ close }) => (
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        // as="a"
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={
                          location.pathname === item.href ? "page" : undefined
                        }
                        onClick={() => close()}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header> */}
        <div className="block md:flex">
          <div>
            <img src={hitconLogo} className="w-52 mx-2" />
          </div>
          <main className="grow">
            <div className="mx-auto max-w-7xl">
              {/* Your content */}
              <div className="bg-stone-300/50 rounded-lg m-4 p-1 overflow-x-auto">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export function RootIndex() {
  return (
    <div>
      <h1 className="text-lg">HITCON CMT 2023 Dashboard</h1>
    </div>
  );
}
