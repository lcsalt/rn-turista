import React from "react";
import { View } from "react-native";

const MarginTop = (props) => {
  return <View style={{marginTop: props.size}}>{props.children}</View>;
};

export default MarginTop;
