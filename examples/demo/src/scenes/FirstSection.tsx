import React from "react";
import firstSectionJson from "../data/firstSection.json";

function FirstSection() {
  return (
    <section className="features section">
      <div className="container">
        <div className="features-inner section-inner has-bottom-divider">
          <div className="features-header text-center">
            <div className="container-sm">
              <h2 className="section-title mt-0" id="title-first-section">
                {firstSectionJson.title}
              </h2>
              <p className="section-paragraph" id="subtitle-first-section">
                {firstSectionJson.subtitle}
              </p>
              <div className="features-image">
                <img
                  className="features-illustration asset-light"
                  src={
                    require("../assets/images/features-illustration-light.svg")
                      .default
                  }
                  alt="Feature illustration"
                />
                <img
                  className="features-box asset-light"
                  src={
                    require("../assets/images/" + firstSectionJson.logo).default
                  }
                  alt="Feature box"
                  id="logo-first-section"
                />
              </div>
            </div>
          </div>
          <div className="features-wrap">
            {firstSectionJson.infoSection.map((el: any, index: number) => {
              return (
                <div
                  className="feature is-revealing"
                  key={`div-${el.title || index + 1}`}
                >
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <img
                        className="asset-light"
                        src={
                          el.logo
                            ? require("../assets/images/" + el.logo).default
                            : undefined
                        }
                        alt={`Feature ${index}`}
                      />
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-title mt-0">{el.title}</h3>
                      <p className="text-sm mb-0">{el.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FirstSection;
