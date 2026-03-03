import { useContext } from "react";
import UserInfoContext from "../contexts/userInfoContext";

export default function useUser() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('Unable to create context for User Info');
  }

  return {
    ...context
  };
}