import React from "react";

import { Route } from "react-router-dom";

import "./shoppage.component.scss";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collectionpage/collectionpage.component";

const ShopPage = ({ match }) => {
  return (
    <div className='shoppage'>
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;
