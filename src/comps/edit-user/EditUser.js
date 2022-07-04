import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import { useNavigate } from "react-router-dom";

import { SignInContainer, ButtonsContainer } from "../sign-up/sign_up_style";
import { useParams } from "react-router-dom";
const formatDate = Moment().format("DD-MM-YYYY");

const defaultFormFields = {
  First_name: "",
  Last_name: "",
  Username: "",
  sessionTimeOut: 0,
};

const EditUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://127.0.0.1:3001/api/users/" + id);
      const userPermissions = await axios.get(
        "http://127.0.0.1:3001/api/permissions/" + id
      );
      console.log(userPermissions);

      setUser(resp.data);
      setUserPermissions(userPermissions.data);
    };
    fetchData();
  }, []);
  const [User, setUser] = useState([]);

  const [userPermissions, setUserPermissions] = useState([]);

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { First_name, Username, Last_name, sessionTimeOut } = formFields;

  const editUser = async (event) => {
    event.preventDefault();

    alert("Username created");
    event.preventDefault();

    let userJsonFile = {
      id: id,
      ...User,
    };
    console.log("other data created");
    let resp = await axios.put(
      "http://127.0.0.1:3001/api/users/" + id,
      userJsonFile
    );
    event.preventDefault();
    let permissionJsonFile = {
      id: id,
      ...userPermissions,
    };
    console.log("other data created");
    await axios.put(
      "http://127.0.0.1:3001/api/permissions/" + id,
      permissionJsonFile
    );

    alert("sadfsdf");
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const checkboxHandleChange = (event) => {
    const { name, checked } = event.target;

    setUserPermissions({ ...userPermissions, [name]: checked });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...User, [name]: value });
  };

  const handleNumberChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...User, [name]: parseInt(value) });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await editUser();
  };
  console.log(User);
  return (
    <SignInContainer>
      <h2>Create an a account</h2>

      <form>
        First Name:{" "}
        <input
          label="First Name"
          type="text"
          defaultValue={User.First_name}
          required
          onChange={handleChange}
          name="First_name"
        />
        <br />
        Last name:{" "}
        <input
          label="Last name"
          type="text"
          defaultValue={User.Last_name}
          required
          onChange={handleChange}
          name="Last_name"
        />
        <br />
        Username:{" "}
        <input
          label="Username"
          type="text"
          required
          onChange={handleChange}
          name="Username"
          defaultValue={User.Username}
        />
        <br />
        Created date:
        <input label="First Name" type="text" value={User.Created_date} />
        <br />
        sessionTimeOut:{" "}
        <input
          label="sessionTimeOut"
          type="number"
          required
          onChange={handleNumberChange}
          name="sessionTimeOut"
          defaultValue={User.sessionTimeOut}
        />
        <ButtonsContainer></ButtonsContainer>
      </form>

      <h2>Permissions</h2>
      <label>
        View Subscriptions{" "}
        <input
          defaultChecked={userPermissions.View_Subscriptions}
          type="checkbox"
          name="View_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br></br>
        Create Subscriptions
        <input
          type="checkbox"
          defaultChecked={userPermissions.Create_Subscriptions}
          name="Create_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br />
        Update Subscriptions
        <input
          type="checkbox"
          defaultChecked={userPermissions.Update_Subscriptions}
          name="Update_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br />
        Delete Subscriptions
        <input
          defaultChecked={userPermissions.Delete_Subscriptions}
          type="checkbox"
          name="Delete_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br />
        View Movies
        <input
          defaultChecked={userPermissions.View_Movies}
          type="checkbox"
          name="View_Movies"
          onChange={checkboxHandleChange}
        />
        <br />
        Create Movies
        <input
          defaultChecked={userPermissions.Create_Movies}
          type="checkbox"
          name="Create_Movies"
          onChange={checkboxHandleChange}
        />
        <br />
        Update Movies
        <input
          defaultChecked={userPermissions.Create_Movies}
          type="checkbox"
          name="Update_Movies"
          onChange={checkboxHandleChange}
        />
        <br />
        Delete Movies
        <input
          defaultChecked={userPermissions.Delete_Movies}
          type="checkbox"
          name="Delete_Movies"
          onChange={checkboxHandleChange}
        />
      </label>
      <hr />
      <button onClick={editUser}>Save</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </SignInContainer>
  );
};

export default EditUser;
