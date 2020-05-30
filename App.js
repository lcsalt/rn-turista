import React, { useState } from "react";
import { AppLoading } from "expo";
import 'react-native-gesture-handler';

import { functions } from './constants';
import LoginRegisterNavigation from "./navigation/LoginRegisterNavigation.js"


export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={functions.loadAssetsAsync}
        onError={(error) => console.log(error)}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return(
      <LoginRegisterNavigation />
  );
}
