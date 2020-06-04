import 'react-native-gesture-handler';
import React, { useState } from "react";
import { AppLoading } from "expo";
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';

import { functions } from './constants';
import LoginRegisterNavigation from "./navigation/LoginRegisterNavigation.js"
//reducers
import registerReducer from './store/reducers/register.js'

// acá van todos los reducers
const unloggedReducer = combineReducers({
  register: registerReducer,
})
const unloggedStore = createStore(unloggedReducer);


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
      <Provider store={unloggedStore}>
         <LoginRegisterNavigation />
      </Provider>
  );
}
