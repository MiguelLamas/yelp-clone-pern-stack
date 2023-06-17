import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";

const App = () => {
  <div>
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/restaurants/:id" component={UpdatePage} />
        <Route
          exact
          path="/restaurants/:id"
          component={RestaurantDetailsPage}
        />
      </Routes>
    </Router>
  </div>;
};

export default App;
