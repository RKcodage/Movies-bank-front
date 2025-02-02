import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = ({ setUser, userToken, userId }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("code");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/search/movie?api_key=7948061103b4d47261ea505266015c44&query=${search}&language=fr-FR&page=${currentPage}`
  //     )
  //     .then((res) => {
  //       setMoviesData(res.data.results);
  //       setTotalPages(res.data.total_pages);
  //     });
  // }, [search, currentPage]);

  useEffect(() => {
    const query = search.trim() === "" ? "code" : search; // "code" comme recherche par défaut
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7948061103b4d47261ea505266015c44&query=${query}&language=fr-FR&page=${currentPage}`
      )
      .then((res) => {
        setMoviesData(res.data.results);
        setTotalPages(res.data.total_pages); // Mettre à jour la pagination
      });
  }, [search, currentPage]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim() === "") {
                setCurrentPage(1); // Revenir à la première page si la recherche est vide
              }
            }}
          />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>→</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>→</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 15)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card
              movie={movie}
              key={movie.id}
              setUser={setUser}
              userToken={userToken}
              userId={userId}
            />
          ))}
      </div>

      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Form;
