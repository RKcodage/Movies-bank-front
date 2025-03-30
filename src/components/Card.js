import React, { useState } from "react";
import axios from "axios";

const Card = ({ movie, setUser, userToken, userId, deleteStorage }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlistAdded, setIsWishlistAdded] = useState(false);

  const addStorage = async () => {
    console.log("Attempting to add movie to favorites:", movie.id);

    const response = await axios.post(
      `https://site--movies-bank--574qbjcqcwyr.code.run/api/users/${userId}/favorites`,
      {
        movieId: movie.id.toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Si nécessaire
        },
      }
    );

    console.log("Response from backend:", response.data);
    setIsAdded(true);
  };

  const addToWishlist = async () => {
    const response = await axios.post(
      `https://site--movies-bank--574qbjcqcwyr.code.run/api/users/${userId}/wishlist`,
      {
        movieId: movie.id.toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Si nécessaire
        },
      }
    );

    console.log("Response from backend:", response.data);
    setIsWishlistAdded(true);
  };

  // To format the date
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt={`affiche ${movie.title}`}
      />
      <h2>{movie.title}</h2>
      {movie.release_date ? (
        <h5>Sorti le : {dateFormater(movie.release_date)}</h5>
      ) : null}
      <h4>
        {movie.vote_average.toFixed(1)}/10 <span>⭐</span>
      </h4>

      <ul>
        {movie.genre_ids
          ? genreFinder()
          : movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
      </ul>

      {movie.overview ? (
        <h3>Synopsis</h3>
      ) : (
        <p>Aucune description disponible</p>
      )}
      <p>{movie.overview}</p>
      {movie.genre_ids ? (
        <div className="btn-group">
          <div className="btn" onClick={addStorage}>
            {userToken && isAdded ? "❤️‍🔥" : "J'aime"}
          </div>
          <div className="btn-wishlist" onClick={addToWishlist}>
            {userToken && isWishlistAdded ? "Ajouté" : "À regarder"}
          </div>
        </div>
      ) : (
        <div className="btn-group">
          <div
            className="btn"
            id={movie.id}
            onClick={() => deleteStorage(movie.id)}
          >
            Supprimer de la liste
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
