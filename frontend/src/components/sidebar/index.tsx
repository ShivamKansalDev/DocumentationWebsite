import React, { forwardRef, useContext, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { useNavigate } from "react-router-dom";
import AddTopicModal from "../modals/addTopicModal";
import { SidebarProps } from "../../types/components";
import { MainContext } from "../../contexts/mainContextProvider";

const MyCustomButton = forwardRef<
  HTMLButtonElement,
  { onClick?: () => void; className?: string }
>((props, ref) => {
  return <button className={props.className} ref={ref} {...props} />;
});

const Sidebar: React.FC<SidebarProps> = (sidebar) => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("Component must be used within a Provider");
  }

  const { types, titles, questions } = context;
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [iconsOpen, setIconsOpen] = useState(false);

  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed ${sidebar.sidebarWidth} left-0 z-0 h-[100vh] transition-transform -translate-x-full shadow-lg sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="relative h-full px-3 py-2 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li
              key={"introduction"}
              className="p-2 pl-0 text-gray-600 w-full flex items-center justify-between cursor-pointer rounded-lg dark:text-white dark:hover:bg-gray-700 group"
            >
              <span className="ms-3">Introduction</span>
            </li>
            {types &&
              types.map((type) => {
                return (
                  <li key={type.typeName} className="">
                    <Disclosure>
                      <DisclosureButton
                        as={MyCustomButton}
                        className="py-2 pr-2 text-gray-600 w-full flex items-center justify-between cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <span className="ms-3">{type.typeName}</span>
                        <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4" />
                      </DisclosureButton>
                      <DisclosurePanel>
                        <ul>
                          {titles &&
                            titles
                              .filter((title) => title.typeId === type._id)
                              .map((title) => {
                                return (
                                  <li key={title.title}>
                                    <Disclosure as="div">
                                      <DisclosureButton
                                        className="w-full flex items-center justify-between p-2 pr-6 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        as={MyCustomButton}
                                        onClick={() => {
                                          navigate(
                                            `/dashboard/${type.typeLink}/${title.titleLink}/`
                                          );
                                        }}
                                      >
                                        <span className="ms-3">
                                          {title.title}
                                        </span>
                                        <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4" />
                                      </DisclosureButton>
                                      <DisclosurePanel>
                                        <ul>
                                          {questions &&
                                            questions
                                              .filter(
                                                (ques) =>
                                                  ques.typeId === type._id &&
                                                  ques.titleId === title._id
                                              )
                                              .map((ques) => {
                                                return (
                                                  <li
                                                    key={ques.question}
                                                    onClick={() =>
                                                      scrollToSection(
                                                        `${title._id}-${ques._id}`
                                                      )
                                                    }
                                                    className="p-2 pl-8 text-sm cursor-pointer text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                                  >
                                                    {ques.question}
                                                  </li>
                                                );
                                              })}
                                        </ul>
                                      </DisclosurePanel>
                                    </Disclosure>
                                  </li>
                                );
                              })}
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                    <div className=" border-b-[1px] border-gray-300" />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="px-3 py-2 bottom-icons flex flex-row-reverse items-center gap-2 justify-center bottom-2 absolute right-2">
          <button
            onClick={() => {
              setIconsOpen(!iconsOpen);
            }}
            className="py-2 z-30 rounded-full px-2 bg-slate-700 text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined cursor-pointer">
              {iconsOpen
                ? "keyboard_double_arrow_right"
                : "keyboard_double_arrow_left"}
            </span>
          </button>
          <span
            className={`cursor-pointer z-10 px-2 py-2  material-symbols-outlined bg-slate-700 text-white flex items-center justify-center rounded-full ${
              iconsOpen ? " -translate-x-0" : "translate-x-12"
            } transition-transform ease-in-out duration-200`}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            edit
          </span>
          <span
            className={`cursor-pointer z-20 px-2 py-2 material-symbols-outlined bg-slate-700 text-white flex items-center justify-center rounded-full ${
              iconsOpen ? "-translate-x-0" : "translate-x-24"
            } transition-transform ease-in-out duration-200`}
            onClick={() => {
              setAdd(!add);
            }}
          >
            add
          </span>
        </div>
      </aside>
      <AddTopicModal add={true} open={add} setOpen={setAdd} />
      <AddTopicModal edit={true} open={edit} setOpen={setEdit} />
    </div>
  );
};

export default Sidebar;
