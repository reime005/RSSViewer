import React from "react";

import { Platform } from "react-native";

import * as rssParser from "react-native-rss-parser";
import { sortListbyDateDesc } from "../utils/sortListbyDateDesc";

const CORS_PROXY = "https://peaceful-escarpment-39895.herokuapp.com/";

interface IFeedInfo {
  title: string;
}

export interface IFeedEntry {
  title: string;
  description: string;
  url: string;
  date: string;
}

export const useRSSReader = (feedURL?: string) => {
  // TODO: debounce

  const [feedEntries, setFeedEntries] = React.useState<IFeedEntry[] | null>(
    null
  );
  const [feedInfo, setFeedInfo] = React.useState<IFeedInfo | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (typeof feedURL !== "string" || feedURL.length < 1) {
      // TODO: incorrect URL
      return;
    }

    const urlPrefix = Platform.OS === "web" ? CORS_PROXY : "";

    setIsLoading(true);

    fetch(urlPrefix + feedURL)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setFeedInfo({ title: rss.title });

        const eventuallyUnsortedItems = rss.items.map((it) => {
          const entry: IFeedEntry = {
            date: it.published,
            description: it.description ?? "",
            title: it.title,
            url:
              it.links.find((link) => typeof link.url === "string")?.url ?? "",
          };

          return {
            ...entry,
            description: entry.description.substr(0, 130),
          };
        });

        setFeedEntries(sortListbyDateDesc(eventuallyUnsortedItems));
      })
      .catch((e) => {
        setIsError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [feedURL]);

  return { feedEntries, feedInfo, isLoading, isError };
};
