/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FeedOverviewScreen } from "../screens/FeedOverviewScreen";
import { FeedScreen } from "../screens/FeedScreen";
import { FeedDetailsScreen } from "../screens/FeedDetailsScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { Text, TouchableOpacity } from "react-native";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  FeedOverview: undefined;
  Feed: undefined;
  FeedDetails: undefined;
  Favorite: undefined;
};

const Stack = createStackNavigator<RootParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "RSS Feed List",
        headerShown: true,
        headerRight: () => <FavHeader />,
      }}
    >
      <Stack.Screen
        name="FeedOverview"
        component={FeedOverviewScreen}
        options={{
          title: "RSS Feed List",
        }}
      />

      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: "RSS Favorite List",
        }}
      />

      <Stack.Screen name="Feed" component={FeedScreen} options={{}} />

      <Stack.Screen
        name="FeedDetails"
        component={FeedDetailsScreen}
        options={{
          title: "",
          headerRight: undefined,
        }}
      />
    </Stack.Navigator>
  );
};

const FavHeader = () => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={{
        padding: 8,
      }}
      onPress={() => {
        navigate("Favorite");
      }}
    >
      <Text>❤️</Text>
    </TouchableOpacity>
  );
};
