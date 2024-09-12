import React, { createContext, useLayoutEffect, useState } from "react";
import {
  MainContextProps,
  MainContextProviderProps,
  Question,
  Title,
  Type,
} from "../types/components";
import { apiCall } from "../API/login";

export const MainContext = createContext<MainContextProps | undefined>(
  undefined
);

export const MainContextProvider: React.FC<MainContextProviderProps> = ({
  children,
}) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchData = async () => {
    try {
      //types
      const typesData = await apiCall.get("/types");
      const allTypes = typesData.data.list;
      setTypes(allTypes);

      //types
      const titlesData = await apiCall.get("/titles");
      const allTitles = titlesData.data.list;
      setTitles(allTitles);

      //types
      const questionsData = await apiCall.get("/questions");
      const allQuestions = questionsData.data.list;
      setQuestions(allQuestions);
    } catch (error) {
      console.log("!!!Error fetching data", error);
    }
  };
  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <MainContext.Provider
      value={{ types, titles, questions, setTypes, setTitles, setQuestions }}
    >
      {children}
    </MainContext.Provider>
  );
};
