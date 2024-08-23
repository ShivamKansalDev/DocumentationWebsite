import { forwardRef, useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

import contents from "../../data/contents";
import { useNavigate } from 'react-router-dom';
import AddTopicModal from '../modals/addTopicModal';
import { SidebarProps } from '../../types/components';


const MyCustomButton = forwardRef<HTMLButtonElement, { onClick?: () => void,  className?: string; }>(( props, ref) => {
    return <button className={props.className} ref={ref} {...props} />
})

export default function Sidebar(sidebar: SidebarProps ) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <aside id="logo-sidebar" className={`fixed ${sidebar.sidebarWidth} left-0 z-0 h-[100vh] transition-transform -translate-x-full shadow-lg sm:translate-x-0`} aria-label="Sidebar">
                <div className="relative h-full pt-10 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className='absolute top-3 right-3'>
                        <button type="submit" onClick={() => setOpen(!open)} className="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">Add +</button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li key={"introduction"} className="p-2 pl-0 text-gray-600 w-full flex items-center justify-between cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className='ms-3'>
                                Introduction
                            </span>

                        </li>
                        {contents.map((item) => {
                            return (
                                <li key={item.type} className="">
                                    <Disclosure>
                                        <DisclosureButton as={MyCustomButton} className="py-2 pr-2 text-gray-600 w-full flex items-center justify-between cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">{item.type}</span>
                                            <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4" />

                                        </DisclosureButton>
                                        <DisclosurePanel>

                                            <ul>
                                                {item.subheadings.map((subItem) => {

                                                    return (
                                                        <>
                                                            <li key={subItem.topic} onClick={() => {
                                                                const fullLink = `/${item.link}/${subItem.subLink}`;
                                                                navigate(fullLink);
                                                            }}>
                                                                <Disclosure as="div">
                                                                    <DisclosureButton className="w-full flex items-center justify-between p-2 pr-6 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" as={MyCustomButton}>
                                                                        <span className="ms-3">{subItem.topic}</span>
                                                                        <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4" />
                                                                    </DisclosureButton>
                                                                    <DisclosurePanel as="ul">
                                                                        {subItem.questions.map((ques) => {
                                                                            return (
                                                                                <li key={ques.question} className="p-2 pl-8 text-sm cursor-pointer text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                                    {ques.question}
                                                                                </li>
                                                                            )
                                                                        })}
                                                                        <li>

                                                                        </li>
                                                                    </DisclosurePanel>
                                                                </Disclosure>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </DisclosurePanel>
                                    </Disclosure>
                                    <div className=" border-b-[1px] border-gray-300" />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>
            <AddTopicModal open={open} setOpen={setOpen} />
        </>
    );
}