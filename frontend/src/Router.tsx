import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginBG from "./pages/login/index";
import Login from "./pages/login/login";

// dashboard
import Dashboard from "./pages/dashboard";
// import Introduction from "./pages/dashboard/intro";
import Page from "./pages/dashboard/page";
import { Title, Type } from "./types/components";
import { MainContext } from "./contexts/mainContextProvider";

export default function ReactRouter() {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("Component must be used within a Provider");
  }

  const { types, titles, questions } = context;
  console.log(types, titles, questions);
  const [renderRoutes, setRenderRoutes] = useState<boolean>(false);

  useEffect(() => {
    if (types && titles && types?.length > 0 && titles?.length > 0) {
      setRenderRoutes(true);
    } else {
      setRenderRoutes(false);
    }
  }, [types, titles]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {renderRoutes &&
            types &&
            types.map((type: Type) => {
              // console.log("#@#@ TYPES: ", titles);
              return (
                titles &&
                titles
                  .filter((title) => title.typeId === type._id)
                  .map((title: Title) => {
                    const allQuestions = questions
                      ? questions.filter(
                          (question) =>
                            question.typeId === type._id &&
                            question.titleId === title._id
                        )
                      : [];
                    return (
                      <Route
                        path={`${type.typeLink}/${title.titleLink}`}
                        element={
                          <Page pageTitle={title} questions={allQuestions} />
                        }
                        key={`${type.typeLink}/${title.titleLink}`}
                      />
                    );
                  })
              );
            })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
