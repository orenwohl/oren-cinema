import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user_selector";
import { useSelector } from "react-redux";
import axios from "axios";
const Movie = (movie) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const deleteMovie = async (id) => {
    await axios.delete("http://localhost:3001/api/movies/" + id);
    navigate(0);
  };
  return (
    <>
      Name: <h3>{movie?.Name}</h3>
      Genres:
      <span>
        {movie?.Genres?.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </span>
      <span>Premierd : {movie.Premiered}</span>
      <br />
      <img src={movie?.Image} style={{ width: "220px", height: "300px" }} />
      <br />
      <button
        onClick={() => {
          if (currentUser?.currentUser?.permissions.Update_Movies) {
            navigate(`/movies/${movie._id}`);
          } else {
            alert("you dont have a permission");
          }
        }}
      >
        edit
      </button>
      <button
        onClick={() => {
          if (currentUser?.currentUser?.permissions.Delete_Movies) {
            deleteMovie(movie._id);
          } else {
            alert("you dont have a permission");
          }
        }}
      >
        delete
      </button>
    </>
  );
};

export default Movie;
