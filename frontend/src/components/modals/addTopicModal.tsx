/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  template,
  textStyle,
  link,
} from "suneditor/src/plugins";

import { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type { LazyLoadTypes } from "react-slick";
import { TopicModalProps } from "../../types/components";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { SunEditorOptions } from "suneditor/src/options";
import { apiCall } from "../../API/login";
import { MainContext } from "../../contexts/mainContextProvider";
import DisplayContent from "./displayContent";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import GoogleDriveUpload from "../functional/googleDriveUpload";

const sunEditorOptions: SunEditorOptions = {
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
    template,
    textStyle,
    link,
  ],
  buttonList: [
    ["undo", "redo"],
    [
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "link",
      "fontColor",
      "hiliteColor",
    ],
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
    "Trebuchet MS",
  ],
};

export default function AddTopicModal(props: TopicModalProps) {
  const { open, setOpen } = props;
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("Component must be used within a Provider");
  }

  const { types, titles, questions, setTypes, setTitles, setQuestions } =
    context;
  const [isOpen, setIsOpen] = useState(false);
  const [currentObject, setCurrentObject] = useState({
    typeId: "",
    titleId: "",
    questionId: "",
  });

  // selected
  const [selectedType, setSelectedType] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");

  // add states
  const [addType, setAddType] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [addQuestion, setAddQuestion] = useState({
    question: "",
    answer: "",
    attachments: [],
  });
  const [addTypeModel, setAddTypeModel] = useState(false);
  const [addTitleModel, setAddTitleModel] = useState(false);

  // edit states
  const [editType, setEditType] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editTypeModel, setEditTypeModel] = useState(false);
  const [editTitleModel, setEditTitleModel] = useState(false);

  // const [attachments, setAttachments] = useState([]);
  const [googleDriveModel, setGoogleDriveModel] = useState(false);

  // error
  const [error, setError] = useState({
    typeError: false,
    titleError: false,
    questionError: false,
  });
  useEffect(() => {
    if (selectedQuestion) {
      console.log("");
    }
  }, []);

  const sliderDetails = [
    { name: "Type", id: "type" },
    { name: "Title", id: "title" },
    { name: "Ques/Ans", id: "description" },
    { name: "Summary", id: "summary" },
  ];
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
  // slider settings
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const addNewType = async () => {
    try {
      if (error.typeError) {
        return;
      }
      const typeLinkGen = addType.toLowerCase().replace(" ", "-");
      const newType = {
        typeName: addType,
        typeLink: typeLinkGen,
      };
      // currentObject;
      const response = await apiCall.post("/types/create-type", newType);
      setSelectedType(response.data.type.typeName);
      setTypes(response.data.list);
      setCurrentObject({
        ...currentObject,
        typeId: response.data.type._id,
      });
    } catch (error) {
      console.log("Error adding new type: ", error);
    }
  };
  const addNewTitle = async () => {
    try {
      if (error.titleError) {
        return;
      }
      const titleLinkGen = addTitle.toLowerCase().replace(" ", "-");
      const newTitle = {
        title: addTitle,
        titleLink: titleLinkGen,
        typeId: currentObject.typeId,
      };
      // currentObject;
      const response = await apiCall.post("/titles/create-title", newTitle);
      setSelectedTitle(response.data.newTitle.title);
      setTitles(response.data.list);
      setCurrentObject((prev) => ({
        ...prev,
        titleId: response.data.title._id,
      }));
    } catch (error) {
      console.log("Error adding new type: ", error);
    }
  };
  const addNewQuestion = async () => {
    try {
      if (error.questionError) {
        return;
      }
      const quesLinkGen = addQuestion.question.toLowerCase().replace(" ", "-");
      const newQuestion = {
        typeId: currentObject.typeId,
        titleId: currentObject.titleId,
        question: addQuestion.question,
        answer: JSON.stringify(addQuestion.answer),
        quesLink: quesLinkGen,
        attachments: addQuestion.attachments,
      };
      // currentObject;
      const response = await apiCall.post(
        "/questions/create-question",
        newQuestion
      );
      setSelectedQuestion(response.data.newQuestion.question);
      setQuestions(response.data.list);
      setCurrentObject((prev) => ({
        ...prev,
        questionId: response.data.newQuestion._id,
      }));
    } catch (error) {
      console.log("Error adding new type: ", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(!open);
        setCurrentSlide(0);
        setSelectedType("");
        setSelectedTitle("");
        setSelectedQuestion("");
        setAddType("");
        setError({
          typeError: false,
          titleError: false,
          questionError: false,
        });
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
            <div className="w-full h-[90vh] flex items-center justify-center">
              <div className="w-[30%] p-5 h-full bg-gray-300 sidebar-model">
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
                        className={`my-4 mx-2 px-2 py-1 cursor-pointer ${
                          index === currentSlide
                            ? "bg-[#fff] text-[#000] rounded-md py-1"
                            : null
                        }`}
                      >
                        {sliderDetailsItem.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-[70%] h-full sidebar-right">
                <div className="w-full h-full flex flex-col justify-between items-center">
                  <div className="w-full slider-container ">
                    <Slider className="h-full" ref={sliderRef} {...settings}>
                      <div className={`p-5 overflow-y-auto`}>
                        <p>Choose a type</p>
                        <div className="slide-content relative flex items-center justify-center h-[70vh]">
                          <div className="relative text-center">
                            <select
                              value={selectedType}
                              onChange={(e) => {
                                setSelectedType(e.target.value);
                                const findType = types.find(
                                  (item) => item.typeName === e.target.value
                                );
                                if (findType) {
                                  setCurrentObject({
                                    ...currentObject,
                                    typeId: findType._id,
                                  });
                                }
                              }}
                              className="outline-none py-2 px-2 mb-3 text-md border-2 border-gray-300 rounded-lg w-72 bg-white text-gray-700"
                            >
                              <option value="" className="text-gray-400 py-2">
                                Select a type
                              </option>
                              {types &&
                                types.map((type, index) => (
                                  <option
                                    key={index}
                                    value={type.typeName}
                                    className="bg-white hover:bg-gray-100 py-2"
                                  >
                                    {type.typeName}
                                  </option>
                                ))}
                            </select>
                            {props.add && !props.edit && (
                              <div className="absolute right-0 mt-2 cursor-pointer bg-black text-white flex items-center justify-center py-2 px-2 rounded-full">
                                <span
                                  className="material-symbols-outlined"
                                  onClick={() => setAddTypeModel(!addTypeModel)}
                                >
                                  add
                                </span>
                              </div>
                            )}
                            {!props.add && props.edit && (
                              <>
                                <div className="absolute right-0 mt-2 cursor-pointer bg-black text-white flex items-center justify-center py-1 px-2 rounded-md">
                                  {editType ? (
                                    <button
                                      onClick={() =>
                                        setEditTypeModel(editTypeModel)
                                      }
                                    >
                                      Save
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        setEditTypeModel(!editTypeModel)
                                      }
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                                {editTypeModel && (
                                  <input
                                    className="w-72 outline-none py-2 px-2 text-md border-2 border-gray-300 rounded-lg bg-white text-gray-700"
                                    placeholder="Enter a type..."
                                    onChange={(e) =>
                                      setEditType(e.target.value)
                                    }
                                  />
                                )}
                              </>
                            )}
                            <Dialog
                              open={addTypeModel}
                              onClose={() => setAddTypeModel(addTypeModel)}
                              className="relative z-50"
                            >
                              <div className="fixed inset-0 flex items-center justify-center mx-auto  p-4">
                                <DialogPanel className="rounded-md border bg-white p-6 flex-col w-80 h-auto">
                                  <p className="mb-2">Choose a type</p>
                                  <input
                                    value={addType}
                                    className="w-full outline-none py-2 px-2 mb-3 text-md border-2 border-gray-300 rounded-lg bg-white text-gray-700"
                                    placeholder="Enter a type..."
                                    onChange={(e) => setAddType(e.target.value)}
                                  />
                                  {error.typeError && (
                                    <div className="text-red-500 text-sm">
                                      {" "}
                                      Type already exists
                                    </div>
                                  )}
                                  <div className="flex gap-2 justify-end">
                                    <button
                                      className="border bg-black text-white py-1 px-3 rounded-md"
                                      onClick={() => {
                                        setAddType("");
                                        setSelectedType("");
                                        setAddTypeModel(!addTypeModel);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="border bg-black text-white py-1 px-3 rounded-md"
                                      onClick={() => {
                                        if (addType) {
                                          if (
                                            types?.find(
                                              (item) =>
                                                item.typeName.toLowerCase() ===
                                                addType.toLowerCase()
                                            )
                                          ) {
                                            setError((prev) => ({
                                              ...prev,
                                              typeError: true,
                                            }));
                                          } else {
                                            addNewType();
                                            setAddTypeModel(!addTypeModel);
                                          }
                                        }
                                      }}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </DialogPanel>
                              </div>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                      <div className={`p-5 overflow-y-auto`}>
                        <p>Please Choose a Title</p>
                        <div className="slide-content relative flex items-center justify-center h-[70vh]">
                          <div className="text-center">
                            <select
                              value={selectedTitle}
                              onChange={(e) => {
                                setSelectedTitle(e.target.value);
                                const findTitle = titles.find(
                                  (item) => item.title === e.target.value
                                );
                                if (findTitle) {
                                  setCurrentObject({
                                    ...currentObject,
                                    titleId: findTitle._id,
                                  });
                                }
                              }}
                              className="outline-none py-2 px-2 mb-3 text-md border-2 border-gray-300 rounded-lg w-72 bg-white text-gray-700"
                            >
                              <option value="" className="text-gray-400 py-2">
                                Select a title
                              </option>
                              {titles &&
                                titles
                                  .filter((title) => {
                                    return (
                                      title.typeId === currentObject.typeId
                                    );
                                  })
                                  .map((title, index) => (
                                    <option
                                      key={index}
                                      value={title.title}
                                      className="bg-white hover:bg-gray-100 py-2"
                                    >
                                      {title.title}
                                    </option>
                                  ))}
                            </select>
                            {props.add && !props.edit && (
                              <div className="absolute right-0 mt-2 cursor-pointer bg-black text-white flex items-center justify-center py-2 px-2 rounded-full">
                                <span
                                  className="material-symbols-outlined"
                                  onClick={() =>
                                    setAddTitleModel(!addTitleModel)
                                  }
                                >
                                  add
                                </span>
                              </div>
                            )}
                            {!props.add && props.edit && (
                              <>
                                <div className="absolute right-0 mt-2 cursor-pointer bg-black text-white flex items-center justify-center py-1 px-2 rounded-md">
                                  {editType ? (
                                    <button
                                      onClick={() =>
                                        setEditTitleModel(editTitleModel)
                                      }
                                    >
                                      Save
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        setEditTitleModel(!editTitleModel)
                                      }
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                                {editTitleModel && (
                                  <input
                                    className="w-72 outline-none py-2 px-2 text-md border-2 border-gray-300 rounded-lg bg-white text-gray-700"
                                    placeholder="Enter a type..."
                                    onChange={(e) =>
                                      setEditTitle(e.target.value)
                                    }
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <Dialog
                            open={addTitleModel}
                            onClose={() => setAddTitleModel(addTitleModel)}
                            className="relative z-50"
                          >
                            <div className="fixed inset-0 flex items-center justify-center mx-auto  p-4">
                              <DialogPanel className="rounded-md border bg-white p-6 flex-col w-80 h-auto">
                                <p className="mb-2">Choose a title</p>
                                <input
                                  value={addTitle}
                                  className="w-full outline-none py-2 px-2 mb-3 text-md border-2 border-gray-300 rounded-lg bg-white text-gray-700"
                                  placeholder="Enter a title..."
                                  onChange={(e) => setAddTitle(e.target.value)}
                                />
                                {error.titleError && (
                                  <div className="text-red-500 text-sm">
                                    {" "}
                                    Title already exists
                                  </div>
                                )}
                                <div className="flex gap-2 justify-end">
                                  <button
                                    className="border bg-black text-white py-1 px-3 rounded-md"
                                    onClick={() => {
                                      setAddTitle("");
                                      setSelectedTitle("");
                                      setAddTitleModel(!addTitleModel);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="border bg-black text-white py-1 px-3 rounded-md"
                                    onClick={() => {
                                      if (addTitle) {
                                        if (
                                          titles?.find(
                                            (item) =>
                                              item.title.toLowerCase() ===
                                              addTitle.toLowerCase()
                                          )
                                        ) {
                                          setError((prev) => ({
                                            ...prev,
                                            titleError: true,
                                          }));
                                        } else {
                                          addNewTitle();
                                          setAddTitleModel(!addTitleModel);
                                        }
                                      }
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </DialogPanel>
                            </div>
                          </Dialog>
                        </div>
                      </div>
                      <div className={`p-5 overflow-y-auto`}>
                        <div className="slide-content">
                          <div className="overflow-y-auto h-[26rem] mb-2">
                            <div className="text-lg pb-4">Questions</div>
                            {questions &&
                              questions
                                .filter(
                                  (question) =>
                                    question.typeId === currentObject.typeId &&
                                    question.titleId === currentObject.titleId
                                )
                                .map((question) => {
                                  return (
                                    <div
                                      key={`ques${question._id}`}
                                      className={`${
                                        props.edit ? "cursor-pointer" : ""
                                      } bg-white shadow-md p-2 border mb-3`}
                                    >
                                      <h5 className="text-md font-semibold mb-2">
                                        {question.question}
                                      </h5>
                                      <p className="text-sm font-extralight">
                                        <DisplayContent
                                          content={JSON.parse(question.answer)}
                                        />
                                      </p>
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setIsOpen(true)}
                            className="border py-1 px-4 bg-black text-white font-medium rounded-md"
                          >
                            Add +
                          </button>
                        </div>
                        <Dialog
                          open={isOpen}
                          onClose={() => setIsOpen(false)}
                          className="relative z-50"
                        >
                          <div className="fixed inset-0 flex items-center justify-center mx-auto  p-4">
                            <DialogPanel className="border bg-white p-6 flex justify-center flex-col w-[640px] h-[525px]">
                              <h2 className="font-medium text-[20px] mb-5">
                                Question and answer
                              </h2>
                              <div className="">
                                <div className="flex gap-2 mb-3">
                                  <input
                                    value={addQuestion.question}
                                    className="border outline-none  w-full p-2 rounded-sm"
                                    placeholder="Question"
                                    onChange={(e) => {
                                      setAddQuestion((prev) => ({
                                        ...prev,
                                        question: e.target.value,
                                      }));
                                    }}
                                  />
                                  <div
                                    onClick={() =>
                                      setGoogleDriveModel(!googleDriveModel)
                                    }
                                    className="border outline-none cursor-pointer px-2 flex items-center justify-center rounded-sm"
                                  >
                                    <ArrowUpIcon className="h-5 w-5" />
                                  </div>
                                  <Dialog
                                    className={"relative w-full h-full z-50"}
                                    open={googleDriveModel}
                                    onClose={() =>
                                      setGoogleDriveModel(!googleDriveModel)
                                    }
                                  >
                                    <div className="bg-gray-500 bg-opacity-15 fixed inset-0 p-16 flex items-center justify-center mx-auto">
                                      <DialogPanel
                                        className={
                                          "w-auto h-auto p-10 bg-white border border-gray-300 rounded-lg shadow-md"
                                        }
                                      >
                                        <GoogleDriveUpload />
                                      </DialogPanel>
                                    </div>
                                  </Dialog>
                                </div>
                                <div className="mb-4">
                                  <SunEditor
                                    height="40vh"
                                    setOptions={sunEditorOptions}
                                    onChange={(content) => {
                                      setAddQuestion((prev) => ({
                                        ...prev,
                                        answer: content,
                                      }));
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-4">
                                <button
                                  className="border bg-black text-white py-1 px-3 rounded-md"
                                  onClick={() => {
                                    setAddQuestion((prev) => ({
                                      ...prev,
                                      answer: "",
                                    }));
                                    setIsOpen(false);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="border bg-black text-white py-1 px-3 rounded-md"
                                  onClick={() => {
                                    addNewQuestion();
                                    setIsOpen(false);
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </DialogPanel>
                          </div>
                        </Dialog>
                      </div>
                      <div className={`p-5 overflow-y-auto`}>
                        <div className="slide-content w-full">
                          <div className="overflow-y-auto h-[28rem] mb-2">
                            <h5 className="text-md font-semibold mb-5">
                              {selectedType}
                            </h5>
                            <h5 className="text-md font-semibold mb-5">
                              {selectedTitle}
                            </h5>

                            {questions &&
                              questions
                                .filter(
                                  (question) =>
                                    question.typeId === currentObject.typeId &&
                                    question.titleId === currentObject.titleId
                                )
                                .map((question) => {
                                  return (
                                    <div
                                      key={`ques${question._id}`}
                                      className={`${
                                        props.edit ? "cursor-pointer" : ""
                                      } bg-white shadow-md p-2 border mb-3`}
                                    >
                                      <h5 className="text-md font-semibold mb-2">
                                        {question.question}
                                      </h5>
                                      <p className="text-sm font-extralight">
                                        <DisplayContent
                                          content={JSON.parse(question.answer)}
                                        />
                                      </p>
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                  {/* </div> */}
                  <div className="-mt-1 w-full flex items-center justify-between">
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
                          className="text-gray-600 bg-gray-200 m-1 mx-3 rounded-full"
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
                            let ques;
                            if (selectedType && selectedTitle) {
                              ques = questions.filter(
                                (question) =>
                                  question.titleId === currentObject.titleId &&
                                  question.typeId === currentObject.typeId
                              );
                            }
                            if (!selectedType && currentSlide === 0) {
                              return;
                            } else if (!selectedTitle && currentSlide === 1) {
                              return;
                            } else if (!ques && currentSlide === 2) {
                              return;
                            }
                            if (props.edit) {
                              if (currentSlide === 0) {
                                if (!editType) {
                                  // Call API
                                  sliderRef.current.slickNext();
                                  return;
                                }
                              } else if (currentSlide === 1) {
                                if (!editTitle) {
                                  // Call API
                                  sliderRef.current.slickNext();
                                  return;
                                }
                              }
                            }
                            sliderRef.current.slickNext();
                          }
                        }}
                      >
                        <ChevronRightIcon
                          height={30}
                          width={30}
                          className="text-gray-600 bg-gray-200 m-1 mx-3 rounded-full"
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
