import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import BurgerMenuStore from "./store/BurgerMenuStore";
import "./styles/reset.scss";
import "./styles/common.scss";
import RegStore from "./store/RegStore";
import BasketStore from "./store/BasketStore";
import PopupStore from "./store/PopupStore";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      users: new UserStore(),
      basket: new BasketStore(),
      burgers: new BurgerMenuStore(),
      reg: new RegStore(),
      popup: new PopupStore(),
    }}
  >
    <App />
  </Context.Provider>
);
