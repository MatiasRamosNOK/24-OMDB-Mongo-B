import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import MainContainer from "./containers/MainContainer";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
