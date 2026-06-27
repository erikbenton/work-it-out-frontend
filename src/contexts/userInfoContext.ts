import { createContext } from "react";
import type UserInfo from "../types/userInfo";
import type { UserServices } from "../hooks/useUserInfo";
import type { MutateOptions } from "@tanstack/react-query";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";

export type UserInfoContext = {
  userInfo: UserInfo,
  services: UserServices,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userMessages: string[],
  setUserMessages: React.Dispatch<React.SetStateAction<string[]>>,
  handleRegisterAttempt: (email: string, password: string, options?: MutateOptions<AuthenticationResponse, Error, AuthenticationRequest, unknown>) => void,
  handleLoginAttempt: (email: string, password: string, options?: MutateOptions<AuthenticationResponse, Error, AuthenticationRequest, unknown>) => void
  handleLogoutAttempt: (options?: MutateOptions<boolean, Error, void, unknown>) => void
}

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default UserInfoContext;