import { useEffect, useState } from "react";
import axios from "axios";
import { setCurrentUser } from "../../store/user/user_action";
import FormInput from "../form-input/form_input";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user_selector";

import { SignInContainer, ButtonsContainer } from "./sign_in_style";
import { Link, useNavigate } from "react-router-dom";
const defaultFormFields = {
  Username: "",
  password: "",
};

const SignInForm = () => {
  const users = useSelector(selectCurrentUser);
  console.log(users);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const url = "http://127.0.0.1:3001/api/usernames";

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
  const { Username, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Users);
    let user = Users.find(
      (username) =>
        username.Password == password &&
        username.Username === formFields.Username
    );
    console.log(user);
    if (user) {
      const permissions = await axios.get(
        "http://127.0.0.1:3001/api/permissions/" + user._id
      );
      const userData = await axios.get(
        "http://127.0.0.1:3001/api/users/" + user._id
      );
      console.log(userData);
      let currentUser = {
        _id: user._id,
        userData: userData.data,
        permissions: permissions.data,
      };
      dispatch(setCurrentUser({ currentUser }));
      navigate("/moviess/1");
      return Username;
    } else {
      alert("incorrect username or password");
      return Error;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signUp = () => {
    if (Users.find((username) => username.Username === formFields.Username)) {
      navigate(`/sign-up/${formFields.Username}`);
    } else {
      alert("The username is not exixst");
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your usernam and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="Username"
          required
          onChange={handleChange}
          name="Username"
          value={Username}
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
          {/* <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button> */}
          <button type="submit">Sign In</button>
          New user ?<a onClick={signUp}>Create an account</a>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
