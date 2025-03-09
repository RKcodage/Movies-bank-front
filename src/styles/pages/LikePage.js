import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

const LikePage = ({ setUser, userToken, userId }) => {
  const [listData, setListData] = useState([]);

  const deleteStorage = async (movieId) => {
    setListData((prevData) => prevData.filter((movie) => movie.id !== movieId));
    axios
      .delete(
        `https://site--movies-bank--574qbjcqcwyr.code.run/api/users/${userId}/favorites`,
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
        `https://site--movies-bank--574qbjcqcwyr.code.run/api/users/${userId}/favorites`
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
          setListData(moviesData); // Mettre à jour l'état avec les données des films
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des favoris:", error);
      });
  }, [userId]);

  return (
    <div className="user-list-page">
      <h2 style={{ marginTop: "40px" }}>
        Vos coups de coeur <span>❤️‍🔥</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => (
            <Card
              movie={movie}
              key={movie.id}
              setUser={setUser}
              userToken={userToken}
              userId={userId}
              deleteStorage={deleteStorage}
            />
          ))
        ) : (
          <h2 style={{ marginTop: "150px" }}>
            Aucun coups de coeur <span>😢</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default LikePage;
