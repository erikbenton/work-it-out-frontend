import { type ReactNode } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import UserInfoContext from "../../contexts/userInfoContext";

type Props = {
  children: ReactNode
};

export function UserInfoProvider({ children }: Props) {
  const { userInfo, services } = useUserInfo();

  const userInfoContext = {
    userInfo,
    services
  };

  return (
    <UserInfoContext.Provider value={userInfoContext}>
      {children}
    </UserInfoContext.Provider>
  );
}