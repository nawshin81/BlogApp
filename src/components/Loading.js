import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#63a0e0" }}
    >
      <ActivityIndicator size="large" color="red" animating={true} />
    </View>
  );
};

export default Loading;