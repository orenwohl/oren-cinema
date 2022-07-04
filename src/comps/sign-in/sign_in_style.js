import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  width: 380px;
  margin: 10px, 10px, 10px, 10px;

  h2 {
    margin: 10px 0;
    justify-content: center;
  }
  a {
    cursor: pointer;
  }
  @media screen and (max-width: 375px) {
    width: 300px;
    align-items: center;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 375px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
