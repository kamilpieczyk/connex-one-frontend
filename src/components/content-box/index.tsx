import React from "react";

import { ContentBox } from "./style";
import Left from "../left-hand-side";
import Right from "../right-hand-side";

const ContentBoxComponent: React.FC<{}> = () => {
  return (
    <ContentBox>
      <Left />
      <Right />
    </ContentBox>
  );
};

export default ContentBoxComponent;
