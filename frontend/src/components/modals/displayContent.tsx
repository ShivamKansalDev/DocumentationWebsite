import React from "react";
import { DisplayContentProps } from "../../types/components";
import parse from "html-react-parser";

const DisplayContent: React.FC<DisplayContentProps> = (props) => {
  const { content } = props;
  return <div>{parse(content)}</div>;
};

export default DisplayContent;
