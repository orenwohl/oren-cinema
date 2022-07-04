import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [Users, setUsers] = useState([]);
  const [Permissions, setPermissions] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/users");
      const permissions = await axios.get(
        "http://127.0.0.1:3001/api/permissions"
      );
      setPermissions(permissions.data);
      setUsers(resp.data);
    };
    fetchData();
  }, []);

  const findUserPermissions = (id) => {
    const permission = Permissions.filter((permission) => permission.id === id);
    let obj = permission[0];
    let keys = Object.keys(obj);
    let filterd = keys.filter((key) => obj[key]);

    if (Object.values(permission[0] === true)) {
      return filterd;
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/add-user")}>Add user</button>
      {Users.map((user) => {
        return (
          <div key={user.id} style={{ border: "1px solid black" }}>
            Name : <h1>{`${user.First_name} ${user.Last_name}`}</h1>
            Username: <h2>{user.Username}</h2>
            created date: <h2>{user["Created date"]}</h2>
            Permissions:
            {findUserPermissions(user.id)
              .slice(1)
              .map((x, i) => {
                if (x) {
                  return <li key={i}>{x}</li>;
                }
              })}
            <button onClick={() => navigate(`/edituser/${user.id}`)}>
              edit user
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersPage;
