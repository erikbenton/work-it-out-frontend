import { useState, type ReactNode } from "react";
import useUserInfo from "../hooks/useUserInfo";
import UserInfoContext from "./userInfoContext";
import AuthenticationError from "../types/authenticationError";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode
};

export function UserInfoProvider({ children }: Props) {
  const { userInfo, services } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleRegisterAttempt = (
    email: string,
    password: string,
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.registerUser({ email, password }, {
      onSuccess: () => {
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  const handleLoginAttempt = (
    email: string,
    password: string,
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.loginUser({ email, password }, {
      onSuccess: () => {
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  const handleLogoutAttempt = (
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.logoutUser(undefined, {
      onSuccess: () => {
        navigate("/");
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error?) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  const userInfoContext = {
    userInfo,
    services,
    loading,
    setLoading,
    userMessages,
    setUserMessages,
    handleRegisterAttempt,
    handleLoginAttempt,
    handleLogoutAttempt
  };

  return (
    <UserInfoContext.Provider value={userInfoContext}>
      {children}
    </UserInfoContext.Provider>
  );
}