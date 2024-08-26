import React, { useState, useEffect } from "react";
import axios from "axios";

function Account({ userId }) {
  const [username, setUsername] = useState("");

  //Fetch user infos

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8000/user/${userId}`);
      setUsername(res.data.account.username);
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="account-title">
      <h1> Bienvenue {username} sur ton espace personnel. </h1>
    </div>
  );
}

export default Account;
