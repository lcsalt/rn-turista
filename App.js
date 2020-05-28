import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import UnloggedHome from "./screens/UnloggedHome.js"

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-italic": require("./assets/fonts/OpenSans-Italic.ttf"),
    "open-sans-semibold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-semibold-italic": require("./assets/fonts/OpenSans-SemiBoldItalic.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-bold-italic": require("./assets/fonts/OpenSans-BoldItalic.ttf"),
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans-light-italic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
    "paytone-one": require("./assets/fonts/PaytoneOne-Regular.ttf"),
  });
};

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return(

  <UnloggedHome />

  );
}
