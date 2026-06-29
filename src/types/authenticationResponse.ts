import type UserInfo from "./userInfo";

export default interface AuthenticationResponse {
  succeeded: boolean,
  errors?: string[],
  email: string,
  userInfo?: UserInfo
}