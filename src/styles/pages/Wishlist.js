import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistCard from "../../components/WishlistCard";

const Wishlist = ({ setUser, userToken, userId }) => {
  const [wishlistData, setWishlistData] = useState([]);

  const deleteMovieFromWishlist = async (movieId) => {
    setWishlistData((prevWishlistData) =>
      prevWishlistData.filter((movie) => movie.id !== movieId)
    );
    axios
      .delete(
        `https://site--movies-bank--574qbjcqcwyr.code.run/api/users/${userId}/wishlist`,
        {
          data: { movieId },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        console.log("Film supprimé des favoris !");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

  useEffect(() => {
    // Récupérer les favoris de l'utilisateur
    axios
      .get(
        `https://site--movies-bank--574qbjcqcwyr.code.run/api/users/${userId}/wishlist`
      )
      .then((response) => {
        const moviesId = response.data;
        const movieRequests = moviesId.map((movieId) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
          )
        );

        // Attendre que toutes les requêtes soient complètes
        Promise.all(movieRequests).then((responses) => {
          const moviesData = responses.map((res) => res.data);
          setWishlistData(moviesData); // Mettre à jour l'état avec les données des films
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des favoris:", error);
      });
  }, [userId]);

  return (
    <div className="user-list-page">
      <h2 style={{ marginTop: "40px" }}>
        Vos films à regarder plus tard <span>🕑</span>
      </h2>
      <div className="result">
        {wishlistData.length > 0 ? (
          wishlistData.map((movie) => (
            <WishlistCard
              movie={movie}
              key={movie.id}
              setUser={setUser}
              userToken={userToken}
              userId={userId}
              deleteMovieFromWishlist={deleteMovieFromWishlist}
            />
          ))
        ) : (
          <h2 style={{ marginTop: "150px" }}>
            Vous n'avez ajouté aucun film à votre wishlist <span>😢</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
