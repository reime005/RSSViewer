import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { RootNavigator } from "./navigators/RootNavigator";

export default function App() {

  // TODO: error boundary
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
