"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./addTopicModal.css"

// import { useState } from 'react'
import { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type { LazyLoadTypes } from "react-slick";
import { TopicModalProps } from "../../types/components";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import data from "../../data/contents";

// const MenuComponent = () => {
//   return (
//     <select>
//       {data.map((item, index) => {
//         return (
//           <option key={index} value="">
//             {item.type}
//           </option>
//         );
//       })}
//     </select>
//   );
// };

export default function AddTopicModal(props: TopicModalProps) {
  const { open, setOpen } = props;

  const sliderDetails = [
    { name: "Type", id: "type" },
    { name: "Title", id: "title" },
    { name: "Ques/Ans", id: "description" },
    { name: "Summary", id: "summary" },
  ];
  // slider settings
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    // dots: true,
    arrows: false,
    lazyLoad: "progressive" as LazyLoadTypes,
    speed: 500,
    infinte: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    swipe: false,
    beforeChange: (_: number, next: number) => {
      setCurrentSlide(next);
    },
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(!open);
        setCurrentSlide(0);
      }}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* <DialogTitle>
                            Form
                        </DialogTitle> */}
            <div className="w-full h-[90vh] flex items-center justify-center">
              <div className="w-[30%] p-5 h-full bg-gray-300 ">
                <ul>
                  {sliderDetails.map((sliderDetailsItem, index) => {
                    return (
                      <li
                        onClick={() => {
                          if (sliderRef.current) {
                            sliderRef.current.slickGoTo(index, false);
                          }
                        }}
                        key={sliderDetailsItem.id}
                        id={sliderDetailsItem.id}
                        className={`my-5 mx-2 px-2 cursor-pointer `}
                      >
                        {sliderDetailsItem.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-[70%] h-full">
                <div className="w-full h-full flex flex-col justify-between items-center">
                  <div className="w-full slider-container ">
                    <Slider className="h-full" ref={sliderRef} {...settings}>
                      <div className={`p-5 overflow-y-auto`}>
                        <p>Choose a type</p>
                        <div className="slide-content relative flex items-center justify-center h-[70vh]">
                          <div className="text-center">
                            <select className="outline-none py-2 px-2 text-md border-2 border-gray-300 rounded-lg w-52 bg-white text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:ring-blue-500">
                              <option className="text-gray-400 py-2">
                                Select a type
                              </option>
                              {data.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.type}
                                  className="bg-white hover:bg-gray-100 py-2 fo"
                                >
                                  {item.type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className={`p-5 overflow-y-auto`}>
                        <p>Please Choose a Title</p>
                        <div className="slide-content relative flex items-center justify-center h-[70vh]">
                          <div className="text-center">
                            <select className="outline-none py-2 px-2 text-md border-2 border-gray-300 rounded-lg w-52 bg-white text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:ring-blue-500">
                              <option className="text-gray-400 py-2">
                                Select a Title
                              </option>
                              {data.map((item) =>
                                item?.subheadings.map((item, index) => (
                                  <option
                                    key={index}
                                    value={item.topic}
                                    className="bg-white hover:bg-gray-100 py-2 fo"
                                  >
                                    {item.topic}
                                  </option>
                                ))
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 min-h-[80vh] max-h-[80vh] overflow-y-auto">
                        <div className="slide-content">3</div>
                      </div>

                      <div className="p-5 min-h-[80vh] max-h-[80vh] overflow-y-auto">
                        <div className="slide-content w-full">
                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              onClick={() => {
                                setOpen(false);
                                setTimeout(() => {
                                  setCurrentSlide(0);
                                }, 200);
                              }}
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                              Deactivate
                            </button>
                            <button
                              type="button"
                              data-autofocus
                              onClick={() => {
                                setOpen(false);
                                setTimeout(() => {
                                  setCurrentSlide(0);
                                }, 200);
                              }}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                  {/* </div> */}
                  <div className="-my-1 w-full flex items-center justify-between">
                    <span>
                      <button
                        className={`${currentSlide === 0 ? "hidden" : ""}`}
                        onClick={() => {
                          if (sliderRef.current) {
                            sliderRef.current.slickPrev();
                          }
                        }}
                      >
                        <ChevronLeftIcon
                          height={30}
                          width={30}
                          className="text-gray-600 bg-gray-200 m-3 rounded-full"
                        />
                      </button>
                    </span>
                    <span>
                      <button
                        className={`${
                          currentSlide === sliderDetails.length - 1
                            ? "hidden"
                            : ""
                        }`}
                        onClick={() => {
                          if (sliderRef.current) {
                            sliderRef.current.slickNext();
                          }
                        }}
                      >
                        <ChevronRightIcon
                          height={30}
                          width={30}
                          className="text-gray-600 bg-gray-200 m-3 rounded-full"
                        />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
