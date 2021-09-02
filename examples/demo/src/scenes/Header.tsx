import React from "react";
import headerJson from "../data/header.json";

function Header() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title mt-0" id="title-header">
              {headerJson.title}
            </h1>
            <p className="hero-paragraph" id="subtitle-header">
              {headerJson.subtitle}
            </p>
            <div className="hero-cta">
              <a
                className="button button-primary"
                href="/#"
                id="buttonTitle-header"
              >
                {headerJson.buttonTitle}
              </a>
            </div>
          </div>
          <div className="hero-media">
            <div className="header-illustration">
              <img
                className="header-illustration-image asset-light"
                src={
                  require("../assets/images/header-illustration-light.svg")
                    .default
                }
                alt="Header illustration"
              />
            </div>
            <div className="hero-media-illustration">
              <img
                className="hero-media-illustration-image asset-light"
                src={
                  require("../assets/images/hero-media-illustration-light.svg")
                    .default
                }
                alt="Hero media illustration"
              />
            </div>
            <div className="hero-media-container">
              <img
                className="hero-media-image asset-light"
                src={require("../assets/images/" + headerJson.logo).default}
                alt="Hero media"
                id="logo-Header"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
