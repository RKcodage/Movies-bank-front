import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(props) {
  const { setUser } = props;

  // Navigate : redirect if submit is ok
  const navigate = useNavigate();

  // Use states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLERS

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

  // Submit (must contains fetchData calling)
  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch data from back-end
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://site--movies-bank--574qbjcqcwyr.code.run/user/login",
          {
            email,
            password,
          }
        );
        if (response.data.token) {
          const token = response.data.token;
          setUser(token, response.data._id);

          navigate("/home"); // user can enter - redirect to user page
        }
      } catch (error) {
        alert("wrong details");
        console.log(error);
      }
      //     .then((res) => {
      //       if (res.data === "exist") {
      //         history("*", { state: { id: email } });
      //       } else if (res.data === "notexist") {
      //         alert("User has not sign up");
      //       }
      //     })
      //     .catch((e) => {
      //       alert("wrong details");
      //       console.log(e);
      //     });
      // } catch (e) {
      //   console.log(e);
      // };
    };
    fetchData();
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={handleEmail}
            placeholder="Email"
            name=""
            id=""
          />
          <input
            type="password"
            onChange={handlePassword}
            placeholder="Password"
            name=""
            id=""
          />
          <input type="submit" value="Se connecter" />
          <div className="redirect-forgot-password">
            <Link to="/forget-password">Mot de passe oublié ?</Link>
          </div>
        </form>
      </div>

      <div className="authentification-redirect">
        <Link to="/signup">Tu n'est pas inscrit ? Créer toi un compte !</Link>
      </div>
    </div>
  );
}

export default Login;
