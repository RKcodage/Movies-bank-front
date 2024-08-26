import React from "react";
import Form from "../../components/Form";

const Home = ({ setUser, userToken }) => {
  return (
    <div className="home-page">
      <Form setUser={setUser} userToken={userToken} />
    </div>
  );
};

export default Home;
