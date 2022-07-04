import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import SignUpForm from "./comps/sign-up/Sign_up";
import AddNewUser from "./comps/add-new-user/Add-new-user";
import Movies from "./comps/movies/Movies";
import EditMovie from "./comps/movies/EditMovie";
import LoginPage from "./pages/login-page/LoginPage";
import Navigation from "./pages/navigation/navigation";
import UsersPage from "./pages/users-management/UsersPage";
import EditUser from "./comps/edit-user/EditUser";
import AddMovie from "./comps/add-movie/add_movie";
import SubscriptionsPage from "./pages/subscriptions/SubscriptionsPage";
import EditMember from "./comps/member-comp/EditMember";
import AddMember from "./comps/member-comp/AddMember";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<LoginPage />} />
          <Route path="/moviess/:id" element={<Movies />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />

          <Route path="/movies/:id" element={<EditMovie />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/member/:id" element={<EditMember />} />
          <Route path="/member/add" element={<AddMember />} />

          <Route path="/edituser/:id" element={<EditUser />} />

          <Route path="/add-user" element={<AddNewUser />} />
          <Route path="/sign-up/:username" element={<SignUpForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
