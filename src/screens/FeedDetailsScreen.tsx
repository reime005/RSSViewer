import React from "react";
import { View, Text, ActivityIndicator, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { BaseScreen, INavScreenProps } from "../components/BaseScreen";

export interface IFeedDetailsScreenProps {
  feedEntryURL: string;
}

export const FeedDetailsScreen = (
  props: INavScreenProps<IFeedDetailsScreenProps>
) => {
  const [isError, setIsError] = React.useState(false);

  const uri = props.route.params?.feedEntryURL;

  if (typeof uri !== "string") {
    // TODO: error
    console.warn("wrong uri");
    return null;
  }

  if (isError) {
    return (
      <BaseScreen>
        <Text>There was an error, please try again.</Text>
      </BaseScreen>
    );
  }

  // if (Platform.OS === "web") {
  //   return (
  //     <iframe
  //       src={uri}
  //       referrerPolicy="no-referrer"
  //       style={{ flex: 1 }}
  //       width="100%"
  //       height="100%"
  //     />
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <>
        <WebView
          source={{
            uri,
          }}
          onError={() => {
            setIsError(true);
          }}
          startInLoadingState
          style={{ flex: 1 }}
        />
      </>
    </View>
  );
};
