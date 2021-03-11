import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { BaseScreen, INavScreenProps } from "../components/BaseScreen";
import { useNavigation } from "@react-navigation/core";
import { IFeedDetailsScreenProps } from "./FeedDetailsScreen";
import { useRSSReader, IFeedEntry } from "../hooks/useRSSReader";
import HTMLView from "react-native-htmlview";
import { useFavorites } from "../hooks/useFavorites";

export interface IFeedScreenProps {
  feedURL: string;
}

export const FeedScreen = (props: INavScreenProps<IFeedScreenProps>) => {
  const { route } = props;

  const { navigate, setOptions } = useNavigation();
  const { feedEntries, feedInfo, isError, isLoading } = useRSSReader(
    route.params?.feedURL
  );
  const { favItems, addFavItem } = useFavorites();

  React.useEffect(() => {
    if (typeof feedInfo?.title === "string") {
      setOptions({ title: feedInfo.title });
    }
  }, [feedInfo]);

  if (isError) {
    return (
      <BaseScreen>
        <Text>There was an error, please try again.</Text>
      </BaseScreen>
    );
  }

  if (isLoading) {
    return (
      <BaseScreen>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text>loading feed....</Text>
          <ActivityIndicator color="#000" size="large" />
        </View>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      <FlatList
        data={feedEntries}
        keyExtractor={(item, i) => `${i}-${item.title}`}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={(info) => {
          const onPress = () => {
            if (Platform.OS === "web") {
              Linking.openURL(info.item.url);
              return;
            }

            navigate("FeedDetails", {
              feedEntryURL: info.item.url,
            } as IFeedDetailsScreenProps);
          };

          return (
            <TouchableOpacity
              onPress={onPress}
              onLongPress={() => addFavItem(info.item)}
              style={{
                padding: 24,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 24,
              }}
            >
              <Text style={TITLE}>{info.item?.title}</Text>

              <HTMLView
                value={info.item?.description}
                style={{ marginBottom: 8 }}
                stylesheet={{ p: DESCRIPTION, a: DESCRIPTION }}
              />

              <Text style={DATE}>{info.item?.date}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </BaseScreen>
  );
};

export const TITLE: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 8,
};

export const DESCRIPTION: TextStyle = {
  fontSize: 14,
  marginBottom: 8,
};

export const DATE: TextStyle = {
  ...DESCRIPTION,
  color: "#747474",
  marginBottom: 0,
};
