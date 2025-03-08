import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Account({ userId }) {
  const [user, setUser] = useState({
    email: "",
    account: {
      username: "",
    },
  });

  // État temporaire pour le formulaire
  const [formData, setFormData] = useState({
    email: "",
    account: {
      username: "",
    },
  });

  // Récupérer les informations de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://site--movies-bank--574qbjcqcwyr.code.run/user/${userId}`
        );
        // console.log(res.data); // Debug

        // Met à jour l'état avec l'email et le username
        setUser({
          email: res.data.email,
          account: {
            username: res.data.account.username,
          },
        });
        // Initialise formData avec les valeurs actuelles
        setFormData({
          email: res.data.email,
          username: res.data.account.username,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Met à jour l'utilisateur avec les nouvelles données
      const updatedUser = {
        email: formData.email,
        account: {
          username: formData.username,
        },
      };
      await axios.put(
        `https://site--movies-bank--574qbjcqcwyr.code.run/user/${userId}`,
        updatedUser
      );
      // Met à jour l'état user avec les nouvelles données
      setUser(updatedUser);
      alert("Informations mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      alert("Une erreur s'est produite lors de la mise à jour.");
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="account-page">
      <h1 className="account-title">
        {" "}
        Bienvenue {user.account.username} sur ton espace 👋{" "}
      </h1>

      <div className="account-infos-container">
        <h2 className="account-infos-title">Tes Informations Personnelles</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          <p>Email :</p>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p>Nom d'utilisateur :</p>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input type="submit" value="Mettre à jour" />
        </form>
      </div>

      <div
        className="to-favorites"
        style={{
          backgroundImage: "url('/img/movies-background.jpg')",
        }}
      >
        <div className="to-favorites-content">
          <Link to="/coups-de-coeur">Voir mes favoris</Link>
        </div>
      </div>
    </div>
  );
}

export default Account;
