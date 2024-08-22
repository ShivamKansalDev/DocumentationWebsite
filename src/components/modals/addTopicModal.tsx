"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./addTopicModal.css"
import Dropzone from 'react-dropzone'

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link
} from "suneditor/src/plugins";


import { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type { LazyLoadTypes } from "react-slick";
import { TopicModalProps } from "../../types/components";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel
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
  const [isOpen, setIsOpen] = useState(false);

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
                            <select className="outline-none py-2 px-2 text-md border-2 border-gray-300 rounded-lg w-72 bg-white text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:ring-blue-500">
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
                            <input className="outline-none py-2 px-2 text-md border-2 border-gray-300 rounded-lg w-72 bg-white text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:ring-blue-500" placeholder="choose a title..."/>
                          </div>
                        </div>
                      </div>

                      <div className={`p-5`}>
                        <div className="slide-content">
                            <div className="overflow-y-auto h-[26rem] mb-2">
                              <div className="cursor-pointer shadow-md p-2 border mb-5 mx-2">
                                <h5 className="text-md font-semibold mb-2">Go from questioning to understanding.</h5>
                                <p className="text-sm font-extralight">
                                    First you must start with dechlorinated water. Some aquarium salt. Simple goldfish food. Goldfish like vegataion some freshwater plants couldn't hurt. Goldfish are very simple and easy to keep. Just don't overfeed
                                </p>
                              </div>
                              <div className="cursor-pointer shadow-md p-2 border mb-5 mx-2">
                                <h5 className="text-md font-semibold mb-2">Go from questioning to understanding.</h5>
                                <p className="text-sm font-extralight">
                                    First you must start with dechlorinated water. Some aquarium salt. Simple goldfish food. Goldfish like vegataion some freshwater plants couldn't hurt. Goldfish are very simple and easy to keep. Just don't overfeed
                                </p>
                              </div>
                              <div className="cursor-pointer shadow-md p-2 border mb-5 mx-2">
                                <h5 className="text-md font-semibold mb-2">Go from questioning to understanding.</h5>
                                <p className="text-sm font-extralight">
                                    First you must start with dechlorinated water. Some aquarium salt. Simple goldfish food. Goldfish like vegataion some freshwater plants couldn't hurt. Goldfish are very simple and easy to keep. Just don't overfeed
                                </p>
                              </div>
                              <div className="cursor-pointer shadow-md p-2 border mb-5 mx-2">
                                <h5 className="text-md font-semibold mb-2">Go from questioning to understanding.</h5>
                                <p className="text-sm font-extralight">
                                    First you must start with dechlorinated water. Some aquarium salt. Simple goldfish food. Goldfish like vegataion some freshwater plants couldn't hurt. Goldfish are very simple and easy to keep. Just don't overfeed
                                </p>
                              </div>
                            </div>
                         </div>
                         <div className="flex justify-end">
                              <button  
                               onClick={()=>setIsOpen(true)}
                               className="border py-1 px-4 bg-black text-white font-medium rounded-md">Add +</button>
                          </div>
                          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                            <div className="fixed inset-0 flex w-[100vh] mx-auto  p-4">
                              <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 flex justify-center flex-col">
                                <h2 className="font-bold text-[20px]">Question and answer</h2>
                               <div>
                                <input className="border outline-none mb-3 w-full p-2 rounded-sm" placeholder="Question"/>
                               <div className="mb-3">
                               <SunEditor
                                  // hideToolbar={true}
                                  setOptions={{
                                    stickyToolbar: "",
                                    placeholder: "Enter your text here!!!",
                                    plugins: [
                                      align,
                                      font,
                                      fontColor,
                                      fontSize,
                                      formatBlock,
                                      hiliteColor,
                                      horizontalRule,
                                      lineHeight,
                                      list,
                                      paragraphStyle,
                                      table,
                                      template,
                                      textStyle,
                                      image,
                                      link
                                    ],
                                    buttonList: [
                                      ["undo", "redo"],
                                      ["font", "fontSize", "formatBlock"],
                                      ["paragraphStyle"],
                                      [
                                        "bold",
                                        "underline",
                                        "italic",
                                        "strike",
                                        "subscript",
                                        "superscript"
                                      ],
                                      ["fontColor", "hiliteColor"],
                                      ["removeFormat"],
                                      "/",
                                      ["outdent", "indent"],
                                      ["align", "horizontalRule", "list", "lineHeight"],
                                      ["table", "link", "image"]
                                    ],
                                    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                                    font: [
                                      "Arial",
                                      "Calibri",
                                      "Comic Sans",
                                      "Courier",
                                      "Garamond",
                                      "Georgia",
                                      "Impact",
                                      "Lucida Console",
                                      "Palatino Linotype",
                                      "Segoe UI",
                                      "Tahoma",
                                      "Times New Roman",
                                      "Trebuchet MS"
                                    ]
                                  }}
                               />
                               </div>
                                <Dropzone>
                                  {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className="border w-full p-2 mb-3 cursor-pointer">
                                      <input {...getInputProps()} />
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                          <path d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z" fill="#000000"/>
                                      </svg>
                                      <span>Drag 'n' drop some files here, or click to select files</span>
                                    </div>
                                  )}
                                </Dropzone>
                               </div>
                                <div className="flex justify-end gap-4">
                                <button className="border bg-black text-white py-1 px-3 rounded-md" onClick={() => setIsOpen(false)}>Cancel</button>
                                  <button className="border bg-black text-white py-1 px-3 rounded-md" onClick={() => setIsOpen(false)}>Save</button>
                                </div>
                              </DialogPanel>
                            </div>
                          </Dialog>
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
