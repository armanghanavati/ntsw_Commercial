import React from "react";
import { Route } from "react-router-dom";

import routes from "../utils/Routes.js";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="login-layout">
      <Header />
      {routes.map((prop, key) => {
        if (prop.layout === "Login") {
          return (
            <Route
              exact
              path={prop.path}
              component={prop.component}
              key={`routes-${key}`}
            />
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
};

export default Layout;
