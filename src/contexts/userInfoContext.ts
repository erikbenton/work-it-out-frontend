import { createContext } from "react";
import type UserInfo from "../types/userInfo";
import type { UserServices } from "../hooks/useUserInfo";

export type UserInfoContext = {
  userInfo: UserInfo,
  services: UserServices
}

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default UserInfoContext;