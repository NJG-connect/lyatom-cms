import React from "react";
import menuJson from "../data/menu.json";

function Menu() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-inner">
          <div className="brand header-brand">
            <h1 className="m-0">
              <a href="/#">
                <img
                  className="header-logo-image asset-light"
                  src={require("../assets/images/" + menuJson.logo).default}
                  alt="Logo"
                  id="logo-Menu"
                />
              </a>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Menu;
