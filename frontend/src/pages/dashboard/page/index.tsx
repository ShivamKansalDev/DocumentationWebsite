import React from "react";
import { PageProps, Question } from "../../../types/components";
import DisplayContent from "../../../components/modals/displayContent";

const Page: React.FC<PageProps> = (props) => {
  const details = props;
  return details ? (
    <div className="w-full p-5">
      <div className="text-4xl py-5">{details.pageTitle?.title}</div>

      {details.questions &&
        details.questions.map((item: Question, index: number) => {
          return (
            <div
              key={`topic/question-${index}`}
              id={`${details.pageTitle?._id}-${item._id}`}
              className="py-5"
            >
              <div className="text-lg font-semibold pb-2">{item.question}</div>
              <div className="pb-2">
                <DisplayContent content={JSON.parse(item.answer)} />
              </div>
            </div>
          );
        })}
    </div>
  ) : (
    <div></div>
  );
};

export default Page;
