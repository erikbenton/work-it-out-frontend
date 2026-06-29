import { createContext } from "react";
import type LoginInfo from "../types/loginInfo";
import type { UserServices } from "../hooks/useUserInfo";
import type { MutateOptions } from "@tanstack/react-query";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";
import type RegistrationRequest from "../types/registrationRequest";
import type UserInfo from "../types/userInfo";

export type UserInfoContext = {
  user: LoginInfo,
  services: UserServices,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userMessages: string[],
  setUserMessages: React.Dispatch<React.SetStateAction<string[]>>,
  handleRegisterAttempt: (email: string, password: string, userInfo: UserInfo, options?: MutateOptions<AuthenticationResponse, Error, RegistrationRequest, unknown>) => void,
  handleLoginAttempt: (email: string, password: string, options?: MutateOptions<AuthenticationResponse, Error, AuthenticationRequest, unknown>) => void
  handleLogoutAttempt: (options?: MutateOptions<boolean, Error, void, unknown>) => void
}

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default UserInfoContext;