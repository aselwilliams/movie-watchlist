import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MoviePagination from "../components/MoviePagination";

const MovieScreen = ({
  watchList,
  page,
  setPage,
  movieList,
  addMovie,
  removeMovie,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movieList.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  const movieDisplay = currentMovies.map((movie, index) => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        addMovie={addMovie}
        removeMovie={removeMovie}
        watchList={watchList}
      />
    );
  });

  const increment = () => {
    setPage(page + 1);
  };
  const decrement = () => {
    setPage(page - 1);
  };
  return (
    <div className="page">
      <h1>Asel's Movie Theatre</h1>
      <h3>Add a movie to your watchlist</h3>
      <div className="btn-container m-3">
        <button onClick={page > 1 && decrement}>Previous</button>
        <button onClick={increment}>Next</button>
      </div>
      <div className="movie-container">{movieDisplay}</div>
      <MoviePagination
        movieList={movieList}
        currentPage={currentPage}
        changePage={changePage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default MovieScreen;
