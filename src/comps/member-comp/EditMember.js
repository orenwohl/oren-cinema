import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditMember = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/members/" + id);
      console.log(resp.data);
      setMember(resp.data);
    };
    fetchData();
  }, []);
  const Save = async () => {
    await axios.put("http://127.0.0.1:3001/api/members/" + id, member);
    navigate(-1);
  };
  return (
    <div>
      Name
      <input
        type={"text"}
        defaultValue={member.Name}
        onChange={(e) =>
          setMember((prev) => ({ ...prev, Name: e.target.value }))
        }
      />
      <br />
      Email
      <input
        type={"text"}
        defaultValue={member.Email}
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

export default EditMember;
