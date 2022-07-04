import React from "react";
import SignIn from "../../comps/sign-in/Sign_in";
import { SignInContainer } from "./loginPage.style";

const LoginPage = () => {
  return (
    <SignInContainer>
      <SignIn />
    </SignInContainer>
  );
};

export default LoginPage;
