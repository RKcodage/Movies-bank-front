import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://site--movies-bank--574qbjcqcwyr.code.run/forget-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="login-page">
      <div className="reset-form-container">
        <Link to="/">
          <ArrowLeft
            style={{
              position: "absolute",
              left: "20px",
              marginBottom: "40px",
              cursor: "pointer",
            }}
          />
        </Link>

        <h1>Réinitialisation du mot de passe</h1>
        <form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <input
            type="email"
            placeholder="Votre Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Envoyer l'email de réinitialisation"
            style={{ width: "180px", fontSize: "16px" }}
          />
          {message && (
            <p style={{ position: "absolute", top: "120px" }}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
