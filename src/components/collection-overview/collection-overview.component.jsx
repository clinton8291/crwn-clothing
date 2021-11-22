import React from "react";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { selectShopCollectionForPreview } from "../../redux/shop/shop.selectors";

import CollectionPreview from "../collection-preview/collection-preview.component";

const CollectionOverview = ({ collections }) => {
  return (
    <div className='collection-overview'>
      {collections.map(({ id, ...otherCollectionsProps }) => {
        return <CollectionPreview key={id} {...otherCollectionsProps} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionOverview);
