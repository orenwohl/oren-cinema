import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const { id } = useParams();

  const Save = async () => {
    await axios.post("http://127.0.0.1:3001/api/members/", member);
    navigate(-1);
  };
  return (
    <div>
      Name
      <input
        type={"text"}
        onChange={(e) =>
          setMember((prev) => ({ ...prev, Name: e.target.value }))
        }
      />
      <br />
      Email
      <input
        type={"text"}
        onChange={(e) =>
          setMember((prev) => ({ ...prev, Email: e.target.value }))
        }
      />{" "}
      <br />
      City
      <input
        type={"text"}
        defaultValue={member.City}
        onChange={(e) =>
          setMember((prev) => ({ ...prev, City: e.target.value }))
        }
      />{" "}
      <br />
      <button onClick={Save}>save</button>
    </div>
  );
};

export default AddMember;
