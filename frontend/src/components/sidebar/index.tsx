import { forwardRef, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import contents from "../../data/contents";
import { useNavigate } from "react-router-dom";
import AddTopicModal from "../modals/addTopicModal";
import { SidebarProps } from "../../types/components";

const MyCustomButton = forwardRef<
  HTMLButtonElement,
  { onClick?: () => void; className?: string }
>((props, ref) => {
  return <button className={props.className} ref={ref} {...props} />;
});

export default function Sidebar(sidebar: SidebarProps) {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [iconsOpen, setIconsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (iconsOpen) {
      setAnimate(!animate);
      // setTimeout(() => setAnimate(animate), 5000);
    }
  }, [iconsOpen]);
  return (
    <>
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
            {contents.map((item) => {
              return (
                <li key={item.type} className="">
                  <Disclosure>
                    <DisclosureButton
                      as={MyCustomButton}
                      className="py-2 pr-2 text-gray-600 w-full flex items-center justify-between cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ms-3">{item.type}</span>
                      <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4" />
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul>
                        {item.subheadings.map((subItem) => {
                          return (
                            <>
                              <li
                                key={subItem.topic}
                                onClick={() => {
                                  const fullLink = `/${item.link}/${subItem.subLink}`;
                                  navigate(fullLink);
                                }}
                              >
                                <Disclosure as="div">
                                  <DisclosureButton
                                    className="w-full flex items-center justify-between p-2 pr-6 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    as={MyCustomButton}
                                  >
                                    <span className="ms-3">
                                      {subItem.topic}
                                    </span>
                                    <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4" />
                                  </DisclosureButton>
                                  <DisclosurePanel as="ul">
                                    {subItem.questions.map((ques) => {
                                      return (
                                        <li
                                          key={ques.question}
                                          className="p-2 pl-8 text-sm cursor-pointer text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                          {ques.question}
                                        </li>
                                      );
                                    })}
                                    <li></li>
                                  </DisclosurePanel>
                                </Disclosure>
                              </li>
                            </>
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
          <div className="bottom-icons flex flex-row-reverse items-center gap-2 justify-center bottom-2 absolute right-2">
            <button
              onClick={() => {
                setIconsOpen(!iconsOpen);
              }}
              className="py-2 z-30 rounded-full px-2 bg-slate-700 text-white flex items-center justify-center"
            >
              <span className="material-symbols-outlined cursor-pointer">
                {iconsOpen ? 'keyboard_double_arrow_right':'keyboard_double_arrow_left'}
              </span>
            </button>
            <span
              className={`cursor-pointer z-10 px-2 py-2  material-symbols-outlined bg-slate-700 text-white flex items-center justify-center rounded-full ${iconsOpen? " -translate-x-0":"translate-x-12"} transition-transform ease-in-out duration-200`}
              onClick={() => {
                setEdit(!edit);
              }}
            >
              edit
            </span>
            <span className={`cursor-pointer z-20 px-2 py-2 material-symbols-outlined bg-slate-700 text-white flex items-center justify-center rounded-full ${iconsOpen? "-translate-x-0":"translate-x-24"} transition-transform ease-in-out duration-200`}
              onClick={() => {
                setAdd(!add);
              }}
            >
              add
            </span>
          </div>
        </div>
      </aside>
      <AddTopicModal add={true} open={add} setOpen={setAdd} />
      <AddTopicModal edit={true} open={edit} setOpen={setEdit} />
    </>
  );
}
