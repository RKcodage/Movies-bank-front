// React Import
import React, { useState } from "react";

// Import Pages
import Home from "./styles/pages/Home";
import Login from "./styles/pages/Login";
import Signup from "./styles/pages/Signup";
import LikePage from "./styles/pages/LikePage";
import NotFound from "./styles/pages/NotFound";

// Import Packages
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

// Import Components
import Header from "./components/Header";
import Account from "./components/Account";
import ForgotPassword from "./styles/pages/ForgetPassword";
import ResetPassword from "./styles/pages/ResetPassword";
import Footer from "./components/Footer";

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId] = useState(Cookies.get("userId") || null);

  // Protect access to unauthorized users
  const PrivateRoute = ({ children }) => {
    return userToken ? children : <Navigate to="/" />;
  };

  const setUser = (token, id) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      Cookies.set("userId", id, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      Cookies.remove("userId");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header setUser={setUser} userToken={userToken} />
      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} userToken={userToken} />}
        />
        <Route path="/signup" setUser={setUser} element={<Signup />} />
        <Route
          path="/coups-de-coeur"
          element={
            <LikePage userId={userId} setUser={setUser} userToken={userToken} />
          }
        />
        <Route
          path="/account"
          element={
            <Account userId={userId} setUser={setUser} userToken={userToken} />
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home setUser={setUser} userToken={userToken} userId={userId} />
            </PrivateRoute>
          }
        />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {userToken && <Footer />}
    </Router>
  );
};

export default App;
