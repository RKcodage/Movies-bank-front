import React from "react";
import Form from "../../components/Form";

const Home = ({ setUser, userToken, userId }) => {
  return (
    <div className="home-page">
      <Form setUser={setUser} userToken={userToken} userId={userId} />
    </div>
  );
};

export default Home;
