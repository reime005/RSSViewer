import React from "react";
import { load, save } from "../utils/storage/storage";
import { IFeedEntry } from "./useRSSReader";

export const useFavorites = () => {
  const [favItems, setFavItems] = React.useState<IFeedEntry[]>([]);

  const addFavItem = (item: IFeedEntry) => {
    setFavItems([...favItems, item]);
  };

  React.useEffect(() => {
    load("FAVORITES")
      .then((persistedItems) => {
        setFavItems(persistedItems ?? []);
      })
      .catch((e) => console.warn(e));
  }, []);

  React.useEffect(() => {
    //not the best approach to save the list on every change...
    save("FAVORITES", favItems)
      .then(() => console.log("saved favorite"))
      .catch((e) => console.warn(e));
  }, [favItems]);

  return {
    favItems,
    addFavItem,
  };
};
