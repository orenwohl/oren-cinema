import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Member from "../../comps/member-comp/Member";
import { useNavigate } from "react-router-dom";
import MoviesWatched from "../../comps/movies-watched/MoviesWatched";

const SubscriptionsPage = () => {
  const [subscriptions, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/members");
      // console.log(resp.data);
      setMembers(resp.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <button
        style={{ height: "20px", display: "block", margin: "10px" }}
        onClick={() => navigate("/member/add")}
      >
        Add member
      </button>

      {}
      <div
        className="container"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {subscriptions?.map((member) => (
          <div
            key={member._id}
            style={{
              border: "1px solid black",
              width: "300px",
              margin: "10px",
            }}
          >
            <Member member={member} />
            <MoviesWatched member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
