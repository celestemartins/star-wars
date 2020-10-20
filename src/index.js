import React from "react";
import { render } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./layouts/app";
import configureStore from "./state/store";
import "./style.css";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const RootHtml = () => (
  <ReduxProvider store={reduxStore}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);

render(<RootHtml />, document.getElementById("root"));

