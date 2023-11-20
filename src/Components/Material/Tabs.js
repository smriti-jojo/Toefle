import { useState } from "react";
import { Tab } from "@headlessui/react";
import LoginPage from "../../Pages/Login";
import Register from "../../Pages/Register";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ value }) {
  const [index, setIndex] = useState(0);

  let [categories] = useState({
    Login: <LoginPage setIndex={setIndex} />,
    Register: <Register />,
  });
  return (
    <div className="w-full sm:w-full max-w-md px-2 py-4 sm:px-0 mx-4 sm:mx-0">
      <Tab.Group
        onChange={(e) => {
          value(e);
          setIndex(e);
        }}
        selectedIndex={index}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1  sm:ml-0">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <div className="">
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                {posts}
              </Tab.Panel>
            </div>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
