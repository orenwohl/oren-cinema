import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  const saveNewMoive = async () => {
    let obj = movie;

    await axios.post("http://127.0.0.1:3001/api/movies/", obj);
    navigate(-1);
  };

  return (
    <div>
      name
      <input
        type={"text"}
        defaultValue={movie.Name}
        onChange={(e) =>
          setMovie((prev) => ({ ...prev, Name: e.target.value }))
        }
      />
      <br />
      genres
      <input
        type={"text"}
        defaultValue={movie.Genres}
        onChange={(e) =>
          setMovie((prev) => ({ ...prev, Genres: e.target.value.split(",") }))
        }
      />{" "}
      <br />
      imageUrl
      <input
        type={"text"}
        defaultValue={movie.Image}
        onChange={(e) =>
          setMovie((prev) => ({ ...prev, Image: e.target.value }))
        }
      />{" "}
      <br />
      premierd
      <input
        type={"text"}
        defaultValue={movie.Premiered}
        onChange={(e) =>
          setMovie((prev) => ({ ...prev, Premiered: e.target.value }))
        }
      />{" "}
      <br />
      <button onClick={saveNewMoive}>save</button>
    </div>
  );
};

export default AddMovie;
