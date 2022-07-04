import React from "react";
import Subscription from "./Subscription";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user_selector";
import { setMovies } from "../../store/movies/movies_action";
import { selectMovies } from "../../store/movies/movies_selector";

const Movies = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const movies = useSelector(selectMovies);

  const deleteMovie = async (id) => {
    await axios.delete("http://localhost:3001/api/movies/" + id);
    await axios.delete("http://localhost:3001/api/subs/movie/" + id);
    navigate(0);
  };
  const [filterdMoives, setFilterdMovies] = useState(movies);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/movies");

      dispatch(setMovies(resp.data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredMovies = movies.filter((movie) => {
      if (id != 1) {
        return movie?.Name?.toUpperCase().includes(id.toUpperCase());
      } else {
        return movie?.Name?.toUpperCase().includes(searchField.toUpperCase());
      }
    });

    setFilterdMovies(newFilteredMovies);
  }, [movies, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toUpperCase();
    setSearchField(searchFieldString);
  };
  return (
    <div>
      <span
        style={{ display: "flex", justifyContent: "center", padding: "5px" }}
      >
        <input
          style={{ padding: "10px" }}
          onChange={(event) => onSearchChange(event)}
          placeholder="search movies"
        />

        <button
          style={{ display: "flex", justifyContent: "flex-end" }}
          onClick={() => navigate("/add")}
        >
          Add Movie
        </button>
        <br />
      </span>
      <div className="container">
        {filterdMoives.map((movie) => {
          return (
            <div
              key={movie._id}
              style={{
                border: "1px solid black",
                margin: "10px",
                width: "300px",
              }}
            >
              Name: <h3>{movie.Name}</h3>
              Genres:
              <span>
                {movie.Genres.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </span>
              <span>Premierd : {movie.Premiered}</span>
              <br />
              <img
                src={movie.Image}
                style={{ width: "220px", height: "300px" }}
              />
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
              <Subscription movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
