import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/movies/" + id);
      console.log(resp.data);
      setMovie(resp.data);
    };
    fetchData();
  }, []);
  const Save = async () => {
    await axios.put("http://127.0.0.1:3001/api/movies/" + id, movie);
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
      <button onClick={Save}>save</button>
    </div>
  );
};

export default EditMovie;
