import React from "react";

function Footer() {
  return (
    <footer className="site-footer has-top-divider">
      <div className="container">
        <div className="brand footer-brand site-footer-inner">
          <div className="flexFooter">
            <div>
              <a
                href="https://github.com/NJG-connect/lyatom-cms"
                target="_blank"
                rel="noreferrer"
              >
                <div className="content-with-image-footer">
                  <img
                    className="image-footer"
                    alt="github"
                    src={require("../assets/footer/github.svg").default}
                  />
                  <p>Github</p>
                </div>
              </a>
              <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                <div className="content-with-image-footer">
                  <img
                    className="image-footer"
                    alt="React.js"
                    src={require("../assets/footer/react.svg").default}
                  />
                  <p>React</p>
                </div>
              </a>
              <a href="https://njgconnect.fr" target="_blank" rel="noreferrer">
                <div className="content-with-image-footer">
                  <img
                    className="image-footer"
                    alt="NJG Connect"
                    src={require("../assets/footer/njgconnect.png").default}
                  />
                  <p>NJG Connect</p>
                </div>
              </a>
            </div>
            <div className="right-content-footer">
              <a
                href="https://github.com/NJG-connect/lyatom-cms"
                target="_blank"
                rel="noreferrer"
              >
                <p>Docs</p>
              </a>
              <a
                href="https://github.com/NJG-connect/lyatom-cms"
                target="_blank"
                rel="noreferrer"
              >
                <p>Rejoignez la communauté</p>
              </a>
              <a href="https://njgconnect.fr" target="_blank" rel="noreferrer">
                <p>Aide au déploiement</p>
              </a>
            </div>
          </div>
          <div className="footer-copyright">Lyatom CMS &copy; 2021</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
