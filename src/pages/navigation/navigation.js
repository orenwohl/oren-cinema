import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user_selector";
import { setCurrentUser } from "../../store/user/user_action";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const logOut = () => {
    dispatch(setCurrentUser(false));
    navigate("/");
  };
  // const isCartOpen = useSelector(selectIsCartOpen);
  // console.log(isCartOpen);
  return (
    <>
      {currentUser ? (
        <NavigationContainer>
          <NavLinks>
            <NavLink to="/moviess/1">MOVIES</NavLink>
            <NavLink to="/subscriptions">SUBSCRIPTIONS</NavLink>
            {currentUser.currentUser?._id === "62c3120a84f810168b3c642d" ? (
              <NavLink to="/users">USERS MANGMENT</NavLink>
            ) : (
              ""
            )}

            {currentUser ? (
              <NavLink as="span" onClick={logOut}>
                {" "}
                HI{" "}
                {currentUser?.currentUser?.userData?.First_name?.toUpperCase()}{" "}
                <br></br>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/">SIGN IN</NavLink>
            )}
          </NavLinks>
        </NavigationContainer>
      ) : (
        <div></div>
      )}

      <Outlet />
    </>
  );
};

export default Navigation;
