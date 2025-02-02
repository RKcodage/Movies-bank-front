import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'email de réinitialisation.");
    }
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
        <form onSubmit={handleSubmit}>
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
            style={{ width: "250px" }}
          />
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
