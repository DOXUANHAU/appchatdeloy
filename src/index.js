import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/global";
import store from "./store/Store";
import { Provider } from "react-redux";
import WebsocketProvider from "./socket/WebsocketProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const root = ReactDOM.createRoot(document.getElementById("root"));

let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <WebsocketProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </PersistGate>
      </Provider>
    </WebsocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
