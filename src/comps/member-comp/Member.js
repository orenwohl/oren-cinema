import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user_selector";

const Member = ({ member }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const deleteMember = async () => {
    await axios.delete("http://127.0.0.1:3001/api/members/" + member._id);
    await axios.delete("http://127.0.0.1:3001/api/subs/" + member._id);
    navigate(0);
  };

  return (
    <div>
      <h4>{member?.Name}</h4>
      email: <h4>{member?.Email}</h4>
      city: <h4>{member?.City}</h4>
      <button
        onClick={() => {
          if (currentUser?.currentUser?.permissions?.Update_Subscriptions) {
            navigate(`/member/${member._id}`);
          } else {
            alert("you dont have a permission");
          }
        }}
      >
        edit
      </button>
      <button
        onClick={() => {
          if (currentUser?.currentUser?.permissions.Delete_Subscriptions) {
            deleteMember(member._id);
          } else {
            alert("you dont have a permission");
          }
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Member;
