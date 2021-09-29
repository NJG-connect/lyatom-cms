import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import Footer from "./Footer";
import data from "../data";
import AdminPanel from "lyatom-cms";

function Home() {
  return (
    <div>
      <AdminPanel
        config={data}
        githubToken={process.env.REACT_APP_GH_TOKEN_PERSONAL!}
      />
      <div className="body-wrap boxed-container">
        <Menu />

        <main>
          <Header />
          <FirstSection />
          <SecondSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
