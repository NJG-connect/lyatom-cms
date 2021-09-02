import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./scenes/Loading";

const Home = lazy(() => import("./scenes/Home"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
