import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup(props) {
  const { setUser } = props;

  // Navigate : redirect user to a page if submit is ok
  const navigate = useNavigate();

  // Use states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLERS

  // Name
  const handleName = (event) => {
    const result = event.target.value;
    setName(result);
  };

  // Email
  const handleEmail = (event) => {
    const result = event.target.value;
    setEmail(result);
  };

  // Password
  const handlePassword = (event) => {
    const result = event.target.value;
    setPassword(result);
  };

  // Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/user/signup", {
          username: name,
          email: email,
          password: password,
        });
        if (response.data.token) {
          const token = response.data.token;
          setUser(token, response.data._id);
          navigate("/login");
        }
      } catch (error) {
        alert("wrong details");
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <div className="login-page">
      <div className="signup-form-container">
        <h1>S'inscrire</h1>
        <form action="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleName}
            placeholder="Nom d'utilisateur"
          />
          <input type="email" onChange={handleEmail} placeholder="Email" />
          <input
            type="password"
            onChange={handlePassword}
            placeholder="Password"
          />
          <input type="submit" value="S'inscrire" />
        </form>
      </div>

      <div className="authentification-redirect">
        <Link to="/">Déjà inscrit ? Connecte-toi !</Link>
      </div>
    </div>
  );
}

export default Signup;
