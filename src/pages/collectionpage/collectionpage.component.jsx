import React from "react";
import "./collectionpage.styles.scss";

import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import {selectShopCollection} from "../../redux/shop/shop.selectors";

const CollectionPage = ({ collection, match }) => {
  const { title, items } = collection;
  console.log(collection);
  return (
    <div className='collection-page'>
      <div className='title'>{title.toUpperCase()}</div>
      <div className='items'>
        {items
          .map((item) => {
            return <CollectionItem key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state,ownProps) => ({
    collection: selectShopCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
