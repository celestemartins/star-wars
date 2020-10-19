import React from "react";
import { render } from "react-dom";
import "./style.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./state/store";
import App from "./views/layouts/app";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const RootHtml = () => (
  <ReduxProvider store={reduxStore}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);

render(<RootHtml />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
