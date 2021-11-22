import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

/*const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  women: 4,
  men: 5,
};*/

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopCollectionForPreview = createSelector(
    [selectShopCollections],
    (collections) => Object.keys(collections).map(key => collections[key])
);

export const selectShopCollection = (collectionUrlParam) => {
  return createSelector([selectShopCollections], (collections) =>
    /*collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )*/
    collections[collectionUrlParam]
  );
};
