import React from "react";
import ContentWrap from "../components/ContentWrap";

const NotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrap>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrap>
    </div>
  );
};

export default NotFound;
