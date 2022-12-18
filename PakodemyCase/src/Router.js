import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigations/appStack";
import { Provider } from "react-redux";
import store from "./redux/store";

const Router = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
