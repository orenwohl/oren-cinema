import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  h2 {
    margin: 10px 0;
  }
  a {
    cursor: pointer;
  }
  @media screen and (max-width: 375px) {
    width: 300px;
    align-items: center;
  }
`;
