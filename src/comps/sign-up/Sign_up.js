import { useState, useEffect } from "react";
import axios from "axios";

import FormInput from "../form-input/form_input";

import { SignInContainer, ButtonsContainer } from "./sign_up_style";
import { useParams } from "react-router-dom";

const defaultFormFields = {
  Username: "",
  password: "",
};

const SignUpForm = () => {
  const url = "http://127.0.0.1:3001/api/usernames";
  const { username } = useParams();

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(url);
      console.log(resp.data);
      setUsers(resp.data);
    };
    fetchData();
  }, []);

  const creatAnAccount = async () => {
    const user = Users.find((user) => user.Username === username);
    const { _id } = user;
    setFormFields({ ...formFields, Username: username });
    const obj = { Password: password };
    await axios.put(`${url}/${_id}  `, obj);
    alert("username has created");
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { Username, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Users);
    const auth = (error) => {
      if (Users.find((Username) => Username.Password == password)) {
        return;
      } else {
        alert("incorrect username or password");
        return error;
      }
    };

    try {
      await auth();
      console.log("found");
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signUp = async () => {
    if (formFields.password.length >= 1) {
      console.log("oren");
      await creatAnAccount();
    } else {
      alert("The username is not exixst");
    }
  };

  return (
    <SignInContainer>
      <h2>Create an a account</h2>

      <form>
        <FormInput
          label="Username"
          type="Username"
          onChange={() => setFormFields({ ...formFields, Username: username })}
          value={username}
          name="Username"
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <button onClick={signUp}>Create an account</button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignUpForm;
