import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BaseScreen, INavScreenProps } from "../components/BaseScreen";

const feeds = [
  "https://medium.com/feed/@reime005",
  "https://hnrss.org/newest?q=ReactNative",
  "https://www.reddit.com/.rss",
  "http://www.nasa.gov/rss/dyn/breaking_news.rss",
];

interface IFeedOverviewScreenProps {}

export const FeedOverviewScreen = (
  props: INavScreenProps<IFeedOverviewScreenProps>
) => {
  const { navigate } = useNavigation();

  return (
    <BaseScreen>
      <FlatList
        data={feeds}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={(info) => {
          const onPress = () => {
            navigate("Feed", { feedURL: info.item });
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
              <Text>{info.item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </BaseScreen>
  );
};
