import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form_input";

import { SignInContainer, ButtonsContainer } from "./sign_up_style";

const formatDate = Moment().format("DD-MM-YYYY");

const defaultFormFields = {
  First_name: "",
  Last_name: "",
  Username: "",
  sessionTimeOut: 0,
};

const defaultCheckbox = {
  View_Subscriptions: false,
  Create_Subscriptions: false,
  Delete_Subscriptions: false,
  View_Movies: false,
  Create_Movies: false,
  Delete_Movies: false,
};

const AddNewUser = () => {
  const navigate = useNavigate();

  const url = "http://127.0.0.1:3001/api/usernames";
  // const { username } = useParams();
  const [User, setUser] = useState([]);

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(url);
      console.log(resp.data);
      setUsers(resp.data);
    };
    fetchData();
  }, []);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [permissions, setFormPermissions] = useState(defaultCheckbox);

  const { First_name, Username, Last_name, sessionTimeOut } = formFields;

  const creatAnAccount = async (event) => {
    event.preventDefault();

    let obj = { Username: Username, Password: "" };
    const id = await axios.post(url, obj);

    alert("Username created");
    event.preventDefault();

    let userJsonFile = {
      id: id.data._id,
      First_name: First_name,
      Username: Username,
      Last_name: Last_name,
      sessionTimeOut: parseInt(sessionTimeOut),
      Created_date: formatDate,
    };
    console.log("other data created");
    let resp = await axios.post(
      "http://127.0.0.1:3001/api/users",
      userJsonFile
    );
    event.preventDefault();
    let permissionJsonFile = {
      id: id.data._id,

      ...permissions,
    };
    console.log("other data created");
    await axios.post(
      "http://127.0.0.1:3001/api/permissions",
      permissionJsonFile
    );

    alert("sadfsdf");
  };

  const checkboxHandleChange = (event) => {
    const { name, checked } = event.target;

    setFormPermissions({ ...permissions, [name]: checked });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Create an a account</h2>

      <form>
        <FormInput
          label="First Name"
          type="text"
          required
          onChange={handleChange}
          name="First_name"
          value={First_name}
        />

        <FormInput
          label="Last name"
          type="text"
          required
          onChange={handleChange}
          name="Last_name"
          value={Last_name}
        />

        <FormInput
          label="Username"
          type="text"
          required
          onChange={handleChange}
          name="Username"
          value={Username}
        />

        <FormInput
          label="sessionTimeOut"
          type="number"
          required
          onChange={handleChange}
          name="sessionTimeOut"
          value={sessionTimeOut}
        />
        <ButtonsContainer></ButtonsContainer>
      </form>

      <h2>Permissions</h2>
      <label>
        View Subscriptions{" "}
        <input
          type="checkbox"
          name="View_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br></br>
        Create Subscriptions
        <input
          type="checkbox"
          name="Create_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br />
        Update Subscriptions
        <input
          type="checkbox"
          name="Update_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br />
        Delete Subscriptions
        <input
          type="checkbox"
          name="Delete_Subscriptions"
          onChange={checkboxHandleChange}
        />
        <br />
        View Movies
        <input
          value={defaultCheckbox.View_Movies}
          type="checkbox"
          name="View_Movies"
          onChange={checkboxHandleChange}
        />
        <br />
        Create Movies
        <input
          type="checkbox"
          name="Create_Movies"
          onChange={checkboxHandleChange}
        />
        <br />
        Update Movies
        <input
          type="checkbox"
          name="Update_Movies"
          onChange={checkboxHandleChange}
        />
        <br />
        Delete Movies
        <input
          type="checkbox"
          name="Delete_Movies"
          onChange={checkboxHandleChange}
        />
      </label>
      <hr />
      <button onClick={creatAnAccount}>Save</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </SignInContainer>
  );
};

export default AddNewUser;
