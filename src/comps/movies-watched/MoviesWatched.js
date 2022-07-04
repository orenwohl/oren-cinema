import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";

import { useNavigate } from "react-router-dom";

const MoviesWatched = (member) => {
  const formatDate = Moment().format("DD-MM-YYYY");

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [movieToSubscribe, setMovieToSubscribe] = useState([]);
  const [filterd, setFilterd] = useState([]);

  const [subscription, setSubscription] = useState([]);

  //setClassName
  const [isShow, setIsShow] = useState({ isShow: false });

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        "http://127.0.0.1:3001/api/subs/" + member.member._id
      );
      setSubscription(resp.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/movies");

      setMovies(resp.data);
    };
    fetchData();
  }, []);

  const createNewSubscription = async () => {
    if (subscription[0]?.Movies) {
      let obj = subscription[0]?.Movies;

      obj.push({ MovieId: movieToSubscribe, date: formatDate });
      let userJsonFile = {
        Movies: obj,
      };

      const resp = await axios.put(
        "http://127.0.0.1:3001/api/subs/" + member.member._id,
        userJsonFile
      );
      navigate(0);
    } else {
      let obj = { MovieId: movieToSubscribe, date: formatDate };
      let userJsonFile = {
        MemberId: member.member._id,
        Movies: obj,
      };
      const resp = await axios.post(
        "http://127.0.0.1:3001/api/subs",
        userJsonFile
      );
      navigate(0);
    }
  };

  /// function to know which movies alredy watched by the user and display the once he didn't watch yet ////
  useEffect(() => {
    const filterMovies = async () => {
      let moviesWatched = [];
      let moviesToWatch = [];
      if (subscription[0]?.Movies) {
        moviesWatched = subscription[0]?.Movies;
        moviesToWatch = movies
          .filter((movie) => {
            return !moviesWatched.some((m) => m.MovieId === movie._id);
          })
          .map((movie) => {
            return movie;
          });
      } else {
        moviesToWatch = movies;
      }
      await setFilterd(moviesToWatch);
    };
    filterMovies();
  }, [subscription, movies]);

  // find movie name by moovie id and return it
  const findMovieName = (movieId) => {
    const movie = movies.find((movie) => movie._id === movieId);
    return (
      <a
        onClick={() => {
          navigate("/moviess/" + movie?.Name);
        }}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        {movie?.Name}
      </a>
    );
  };
  return (
    <div>
      <h2>Movies Watched</h2>
      <button
        onClick={() => {
          setIsShow((prev) => ({ ...prev, isShow: !prev.isShow }));
        }}
      >
        Subscribe to a new movie
      </button>
      {isShow.isShow ? (
        <div>
          <h3>Add a new movie</h3>{" "}
          <select
            onChange={(e) => {
              const movieId = e.target.value;
              setMovieToSubscribe(movieId);
            }}
          >
            <option>Select a movie</option>
            {filterd.map((movie) => {
              return (
                <option key={movie._id} value={movie._id}>
                  {movie.Name}
                </option>
              );
            })}
          </select>
          <button onClick={createNewSubscription}>Add</button>
        </div>
      ) : (
        ""
      )}

      {subscription[0]?.Movies.map((movie, i) => {
        let movieName = findMovieName(movie.MovieId);

        return (
          <span key={i}>
            <p>
              <span style={{ paddingRight: "3px" }}>{movieName}</span>
              {`${movie.date}`}
            </p>
          </span>
        );
      })}
    </div>
  );
};

export default MoviesWatched;
