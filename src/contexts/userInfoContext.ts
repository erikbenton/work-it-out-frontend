import { createContext } from "react";
import type UserInfo from "../types/userInfo";
import type { UserServices } from "../hooks/useUserInfo";

export type UserInfoContext = {
  userInfo: UserInfo,
  services: UserServices,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userMessages: string[],
  setUserMessages: React.Dispatch<React.SetStateAction<string[]>>,
  handleRegisterAttempt: (email: string, password: string, onSuccessCallBack?: (() => void), onErrorCallBack?: (() => void)) => void,
  handleLoginAttempt: (email: string, password: string, onSuccessCallBack?: (() => void), onErrorCallBack?: (() => void)) => void
  handleLogoutAttempt: (onSuccessCallBack?: (() => void), onErrorCallBack?: (() => void)) => void
}

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default UserInfoContext;