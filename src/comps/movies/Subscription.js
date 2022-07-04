import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../store/movies/movies_action";

const Subscription = ({ movie }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [sub, setSub] = useState([]);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/subs/");
      // console.log(resp.data);
      setSubscriptions(resp.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      const members = await axios.get("http://127.0.0.1:3001/api/members");
      // console.log(resp.data);
      setMembers(members.data);
      // dispatch(setMovies(members.data));
    };
    getMembers();
  }, []);

  let MembersWatched = subscriptions.map((subscription) => {
    let MovieWatched = subscription?.Movies?.filter(
      (element) => element.MovieId === movie._id
    );

    if (MovieWatched?.length === 1) {
      let member = members.filter(
        (member) => member._id === subscription.MemberId
      );

      return (
        <li key={subscription?.MemberId}>
          <a className=" text-base font-bold text-blue-600 underline ">
            {member[0]?.Name}{" "}
          </a>
          ,{MovieWatched[0].date}
        </li>
      );
    } else return "";
  });
  console.log(MembersWatched);

  return (
    <>
      {MembersWatched[0] ? (
        <div style={{ border: "1px solid black" }}>
          <h4> subscriptions watch</h4>
          <ul>{MembersWatched}</ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Subscription;
