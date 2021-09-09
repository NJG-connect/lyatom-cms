import React from "react";
import secondSectionJson from "../data/secondSection.json";

function SecondSection() {
  return (
    <section className="cta section">
      <div className="container-sm">
        <div className="cta-inner section-inner">
          <div className="cta-header text-center">
            <h2 className="section-title mt-0" id="title-second-section">
              {secondSectionJson.title}
            </h2>
            <p className="section-paragraph" id="subtitle-second-section">
              {secondSectionJson.subtitle}
            </p>
            <div className="cta-cta">
              <a
                className="button button-primary"
                href="/"
                id="buttonName-second-section"
              >
                {secondSectionJson.buttonName}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecondSection;
