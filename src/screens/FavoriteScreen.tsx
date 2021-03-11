import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  FlatList,
  Linking,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import HTMLView from "react-native-htmlview";
import { BaseScreen, INavScreenProps } from "../components/BaseScreen";
import { useFavorites } from "../hooks/useFavorites";
import { IFeedDetailsScreenProps } from "./FeedDetailsScreen";
import { TITLE, DATE, DESCRIPTION } from "./FeedScreen";

export const FavoriteScreen = () => {
  const { favItems } = useFavorites();
  const { navigate } = useNavigation();

  return (
    <BaseScreen>
      <FlatList
        data={favItems}
        ListEmptyComponent={() => <Text>No favorites found.</Text>}
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
