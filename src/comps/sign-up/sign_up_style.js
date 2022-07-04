import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;

  flex-direction: column;
  width: 380px;
  h2 {
    margin: 10px 0;
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
