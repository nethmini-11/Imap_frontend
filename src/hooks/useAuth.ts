import { useSelector, useDispatch } from "react-redux";

import {
  loginUser,
  logoutUser,
  getProfile,
  setCredentials,
  clearCredentials,
} from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,

    // Actions
    login: () => dispatch(loginUser()),
    logout: () => dispatch(logoutUser()),
    getProfile: () => dispatch(getProfile()),
    setCredentials: (credentials: { user: any; token: string }) =>
      dispatch(setCredentials(credentials)),
    clearCredentials: () => dispatch(clearCredentials()),
  };
};
