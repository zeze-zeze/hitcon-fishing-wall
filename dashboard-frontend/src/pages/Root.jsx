import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import hitconLogo from "../assets/hitcon-logo.svg";
import { navigation } from "./routes";

const pageTrans = {
  "/fish": "/ctf",
  "/ctf": "/popcat",
  "/popcat": "/dino",
  "/dino": "/emoji",
  "/emoji": "/treasure-hunt",
  "/treasure-hunt": "/fish",
};

export default function Root() {
  const location = useLocation();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // in ms
    const rotate = parseInt(searchParams.get("rotate"));
    if (!isNaN(rotate) && rotate >= 100) {
      const timeoutId = setTimeout(() => {
        const next = pageTrans[location.pathname] || "/fish";
        navigate(`${next}?${searchParams.toString()}`, { replace: true });
      }, rotate);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchParams.get("rotate"), location.pathname]);

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
        <Disclosure as="nav">
          {({ open, close }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between my-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="w-28"
                          src={hitconLogo}
                          alt="HITCON CMT 2023"
                          onClick={close}
                        />
                      </Link>
                    </div>
                    <div className="block md:hidden px-4 text-lg font-medium text-black">
                      {
                        navigation.find((i) => i.href === location.pathname)
                          ?.name
                      }
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 p-2 flex items-baseline space-x-1 bg-stone-300/50 rounded-2xl backdrop-blur-sm">
                        {navigation.map((item) => (
                          // <Link to={`contacts/1`}>Your Name</Link>
                          <Link
                            key={item.name}
                            to={item.href}
                            className={clsx(
                              location.pathname === item.href
                                ? "bg-gray-100 text-black"
                                : "text-zinc-700 hover:bg-gray-200 hover:text-black",
                              "rounded-xl px-3 py-2 text-sm font-medium"
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
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-200">
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

              <Disclosure.Panel className="md:hidden border-solid border-t border-b border-zinc-400 backdrop-blur-sm shadow-lg">
                {({ close }) => (
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        // as="a"
                        to={item.href}
                        className={clsx(
                          location.pathname === item.href
                            ? "bg-gray-100 text-black"
                            : "text-zinc-700 hover:bg-gray-200 hover:text-black",
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
        <main className="relative">
          <div className="mx-auto max-w-7xl">
            {/* Your content */}
            <div className="bg-stone-300/50 rounded-lg m-4 p-1 overflow-x-auto">
              <Outlet />
            </div>
          </div>
          <ScrollToTop
            smooth
            className="scroll-to-top grid place-content-center"
            width="24"
            height="24"
          />
        </main>
      </div>
    </>
  );
}

export function RootIndex() {
  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="max-w-screen-sm mx-auto">
        <img src={hitconLogo} />
      </div>
      <div className="space-y-4">
        <p>
          大家好！今年 HITCON
          為大家準備了數個精彩的活動。從專為新手量身訂造的大地遊戲，到考驗資安專家技藝的Re:CTF比賽，再到令人瘋狂的Badge大亂鬥。不論你是誰，這裡都能找到最適合你的活動。
        </p>
        <p>趕緊投身其中，挑戰遊戲，刷上排行榜吧！</p>
      </div>
    </div>
  );
}
