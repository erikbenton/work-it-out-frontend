import type UserInfo from "./userInfo";

export default interface LoginInfo {
  isLoggedIn: boolean,
  email?: string,
  userInfo?: UserInfo
}