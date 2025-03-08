import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams(); // Récupérer le token depuis l'URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="login-page">
      <div className="reset-form-container">
        <h1>Entrez un nouveau mot de passe</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input type="submit" value="Réinitialiser" />
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
