import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";
import { store } from "./store";
import { Provider } from "react-redux";

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery';

window.$ = $;

const appStore = store.configureStore();

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
