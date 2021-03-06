import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { functions } from './constants';
import MainNavigation from "./navigation/MainNavigation.js"
//reducers
import registerReducer from './store/reducers/register.js';
import authReducer from './store/reducers/auth.js';
import recorridoActivoReducer from './store/reducers/recorridoActivo.js';

// Store
const authenticationReducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
  recorridoActivo: recorridoActivoReducer,
})
const authenticationStore = createStore(authenticationReducer, applyMiddleware(thunkMiddleware));


export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  console.disableYellowBox = true; 
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
      <Provider store={authenticationStore}>
         <MainNavigation />
      </Provider>
  );
}
