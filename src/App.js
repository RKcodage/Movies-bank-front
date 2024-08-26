// React Import
import React, { useState } from "react";

// Import Pages
import Home from "./styles/pages/Home";
import Login from "./styles/pages/Login";
import Signup from "./styles/pages/Signup";
import LikePage from "./styles/pages/LikePage";
import NotFound from "./styles/pages/NotFound";

// Import Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Account from "./components/Account";

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const setUser = (token, id) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userId", id, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("token");
      Cookies.remove("id");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header setUser={setUser} userToken={userToken} />
      <Routes>
        <Route
          path="/login"
          element={<Login setUser={setUser} userToken={userToken} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/coups-de-coeur"
          element={<LikePage setUser={setUser} userToken={userToken} />}
        />
        <Route
          path="/account"
          element={
            <Account userId={userId} setUser={setUser} userToken={userToken} />
          }
        />
        <Route
          path="/"
          element={<Home setUser={setUser} userToken={userToken} />}
        />
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
