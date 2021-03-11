import React from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IBaseScreenProps {
  children: React.ReactNode;
}

export interface INavScreenProps<T> {
  route: {
    key: string;
    name: string;
    params?: T;
  };
}

export const BaseScreen = (props: IBaseScreenProps) => {
  const { children } = props;

  return <SafeAreaView style={[container]}>{children}</SafeAreaView>;
};

const container: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "stretch",
  height: "100%",
  width: "100%",
  padding: 16,
  flex: 1,
  backgroundColor: '#fff'
};
