import { USER_ACTION_TYPES } from "./user_types";
import { createAction } from "../reducer_utils";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
