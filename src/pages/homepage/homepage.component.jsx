import React from "react";
//import "./homepage.styles.scss";

import { HomePageContainer } from "./homepage.styles";

import Directory from "../../components/directory/directory.component";

const HomePage = (props) => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
